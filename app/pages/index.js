import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from 'next/dynamic';
import CandyMachine from "../components/CandyMachine";

// Constantes
const TWITTER_HANDLE = "no-1_";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const Home = () => {
    const WalletMultiButtonDynamic = dynamic(
    async () =>
        (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
    );
    // Ações
    const wallet = useWallet();
    console.log(wallet.publicKey ? `Olá mundo! Chave pública: ${wallet.publicKey}`:"")

    const renderNotConnectedContainer = () => (
        <div>
            <img src="https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif" alt="emoji" />

            <div className="button-container">
                <WalletMultiButtonDynamic className="cta-button connect-wallet-button" />
            </div>
        </div>
    );

    return (
      <div className="App">
          <div className="container">
              <div className="header-container">
                  <p className="header">Time machine 🌄</p>
                  <p className="sub-text">Máquina de NFTs históricos </p>
                  {/* Renderize o botão de conexão com a carteira bem aqui */}
                  {wallet.publicKey ? <CandyMachine walletAddress={wallet} /> : renderNotConnectedContainer()}
              </div>
              <div className="footer-container">
                  <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
                  <a className="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer">{`contruido na @${TWITTER_HANDLE}`}</a>
              </div>
          </div>
      </div>
  );
};

export default Home;