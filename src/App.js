import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import Image from "./artifacts/contracts/Image.sol/Image.json";

const imageAddress = "0xC4A743126DCcA4DF85B8f75B6eD113bb69dD65A1";

function App() {
  const [url, setUrlValue] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchImageUrl() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(imageAddress, Image.abi, provider);
      try {
        const data = await contract.getUrl();
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function setUrl() {
    if (!url) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(imageAddress, Image.abi, signer);
      const transaction = await contract.setUrl(url);
      setUrlValue("");
      await transaction.wait();
      fetchImageUrl();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchImageUrl}>Fetch URL</button>
        <button onClick={setUrl}>Set url</button>
        <input
          onChange={(e) => setUrlValue(e.target.value)}
          placeholder="Set url"
          value={url}
        />

        <br />
      </header>
    </div>
  );
}

export default App;
