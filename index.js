// Web3 kütüphanesini yükleme
const Web3 = require('web3');

// Kontrat ABI'sini yükleme
const contractABI = require('./sashanftmarketplace.json');

// Web3 sağlayıcısını ayarlama
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// Kontrat adresi
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

// Kontrat nesnesini oluşturma
const contract = new web3.eth.Contract(contractABI, contractAddress);

// MetaMask ile cüzdan bağlanma işlevi
async function connectWallet() {
    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Wallet connected:", await web3.eth.getAccounts());
    } catch (error) {
        console.error(error);
    }
}

// NFT satın alma işlevi
async function buyNFT() {
    const account = await web3.eth.getAccounts();
    await contract.methods.mint(account[0], 1).send({ from: account[0] });
    console.log("NFT purchased successfully!");
}

// Engellenmiş bir cüzdanı engellemek için işlev
async function blockWallet(walletAddress) {
    await contract.methods.blockWallet(walletAddress).send({ from: walletAddress });
    console.log("Wallet blocked successfully!");
}

// Engellenmiş bir cüzdanı engelden kaldırmak için işlev
async function unblockWallet(walletAddress) {
    await contract.methods.unblockWallet(walletAddress).send({ from: walletAddress });
    console.log("Wallet unblocked successfully!");
}

// NFT'leri görüntüleme işlevi
async function viewNFTs() {
    const account = await web3.eth.getAccounts();
    const ownedNFTs = await contract.methods.ownedNFTs(account[0]).call();
    console.log("Owned NFTs:", ownedNFTs);
}

// NFT transfer işlevi
async function transferNFT(to, tokenId) {
    const account = await web3.eth.getAccounts();
    await contract.methods.safeTransferFrom(account[0], to, tokenId).send({ from: account[0] });
    console.log("NFT transferred successfully!");
}

// Örnek işlev çağrıları
connectWallet(); // Cüzdanı bağla
buyNFT(); // NFT satın al
blockWallet('WALLET_ADDRESS'); // Cüzdanı engelle
unblockWallet('WALLET_ADDRESS'); // Cüzdanı engelden kaldır
viewNFTs(); // Sahip olunan NFT'leri görüntüle
transferNFT('TO_ADDRESS', 'TOKEN_ID'); // NFT transfer et
