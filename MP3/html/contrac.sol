// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importazione delle librerie di OpenZeppelin per ERC1155 e altre funzionalità
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//Versione CHATGPT
// Definizione del contratto, estendendo le funzionalità di ERC1155, burnable, supply e ownable
contract DomainNFT is ERC1155, ERC1155Burnable, ERC1155Supply, Ownable {
    // Mappatura per tenere traccia degli URI dei token e delle associazioni dominio-tokenId
    mapping(uint256 => string) private _tokenURIs;
    mapping(string => uint256) private _domainToTokenId;

    // Mappatura per tenere traccia del proprietario originale di un NFT
    mapping(uint256 => address) private _originalOwner;

    // Contatore per generare nuovi token ID per i domini
    uint256 private _tokenIdCounter;
    uint256 private constant FT_TOKEN_ID = 1; // ID riservato per il fungible token (FT)

    // Costruttore del contratto, imposta l'URI di base e inizializza il contatore tokenId
    constructor() ERC1155("https://yourapi.com/api/token/{id}.json") {
        _tokenIdCounter = 2; // Inizia da 2 perché 1 è riservato per il FT
    }

    // Funzione per coniare un nuovo dominio come NFT
    function mintDomain(string memory domain) public {
        require(_domainToTokenId[domain] == 0, "Domain already minted");
        uint256 newTokenId = _tokenIdCounter++;
        _mint(msg.sender, newTokenId, 1, "");
        _originalOwner[newTokenId] = msg.sender;
        _domainToTokenId[domain] = newTokenId;
        _setTokenURI(newTokenId, domain);
    }

    // Funzione per acquistare un dominio
    function buyDomain(string memory domain) public payable {
        uint256 tokenId = _domainToTokenId[domain];
        require(tokenId != 0, "Domain not minted");
        require(balanceOf(msg.sender, FT_TOKEN_ID) >= 1, "Insufficient FT balance");
        address owner = ownerOf(tokenId);
        require(owner != msg.sender, "You already own this domain");

        safeTransferFrom(owner, msg.sender, tokenId, 1, "");
        if (_originalOwner[tokenId] != owner) {
            // Implementare il pagamento delle royalty al proprietario originale
        }
        // Trasferimento del FT come pagamento
        safeTransferFrom(msg.sender, owner, FT_TOKEN_ID, 1, "");
    }

    // Funzione per coniare FT (fungible token)
    function mintFT(uint256 amount) public onlyOwner {
        _mint(msg.sender, FT_TOKEN_ID, amount, "");
    }

    // Funzione privata per impostare l'URI di un token
    function _setTokenURI(uint256 tokenId, string memory domain) private {
        _tokenURIs[tokenId] = domain;
    }

    // Override della funzione uri per restituire l'URI del token basato su tokenId
    function uri(uint256 tokenId) override public view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    // Funzione per ottenere il proprietario originale di un NFT
    function ownerOf(uint256 tokenId) public view returns (address) {
        return _originalOwner[tokenId];
    }
}




//====================================================================

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// Importa la libreria SafeMath
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DomainMarketplace is ERC1155, Ownable {
    using SafeMath for uint256;

    // Struct per rappresentare un dominio
    struct Domain {
        address originalOwner;
        address currentOwner;
        bool inSale;
    }

    // Mappa per associare l'ID del dominio alla struttura Domain
    mapping(uint256 => Domain) private _domains;
    

    // Costruttore del contratto
    constructor() ERC1155("") {
        // ci interessa storare qualcosa alla creazione?
    }

    function mint(bytes1[] calldata domainId){
        //Se il dominio passato è libero
        if (_domains[domainId].originalOwner == address(0)) {
            purchaseNewDomain(domainId);
            
        }
        //Altrimenti devo controllare se il dominio è in vendita

        else if(_domains[domainId].inSale){
            address currentOwner = _domains[domainId].currentOwner;
            purchaseExistingDomain(domainId, currentOwner);

        }else{
            //errore il dominio è già in uso

        }
    }

    // Funzione per acquistare un dominio ex novo
    function purchaseNewDomain(bytes1[] calldata domainId) external payable {
        // Verifica che il creator abbia abbastanza token
        require(msg.value >= 1 ether, "Insufficient payment");
        // Verifica che il dominio non sia già stato creato
        //require(_domains[domainId].originalOwner == address(0), "Domain already created");

        // Inserimento dei dati nella struttura
        _domains[domainId] = Domain(msg.sender,msg.sender)
        
    }

    // Funzione per acquistare un dominio da un utente
    function purchaseExistingDomain(uint256 domainId, address currentOwner, priceValue) external payable {

        //require(!_availableDomains[domainId], "Domain not for sale");
        require(msg.value >= 1 priceValue, "Insufficient payment");
        //acquirente attuale lo abbiamo

        //possessore attuale

        // effettua lo scambio monetario e dell'NFT
        _exchangeDomain(msg.sender, domainId);




        //QUESTIONE ROYALTY

        // Ottiene l'acquirente originale (generatore) del dominio
        address originalOwner = _domains[domainId].originalOwner;

        // Calcola il compenso da inviare al generatore
        uint256 royaltyAmount = msg.value.mul(_royaltyPercentage).div(100);

        

        // Trasferisce il compenso al generatore
        payable(originalOwner).transfer(royaltyAmount);

        // Emesse gli eventi e gestisce il pagamento
        _handlePurchase(domainId);
    }

    // Funzione interna per gestire l'acquisto di un dominio
    function _handlePurchase(uint256 domainId) internal {
        // Emessa l'evento di acquisto
        emit DomainPurchased(msg.sender, domainId, 1);
    }

    // Funzione interna per trasferire il possesso di un dominio
    function _transferDomain(address to, uint256 domainId) internal {
        _mint(to, domainId, 1, "");
        _availableDomains[domainId] = false;
        _domains[domainId] = Domain(to, true);
    }

    // Funzione per ottenere l'owner di un dominio
    function getDomainOwner(uint256 domainId) external view returns (address) {
        return ownerOf(domainId);
    }
}