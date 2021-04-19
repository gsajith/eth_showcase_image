import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import Image from "./artifacts/contracts/Image.sol/Image.json";
import styled from "styled-components";
import Tilt from "react-parallax-tilt";

const imageAddress = "0x43dFD957bB91b568176E976A8d4e8ab4E94aeBfD";

const Showcase = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: -6px;
  border-radius: 16px;
  box-shadow: 0.6877605319023132px 1.719401240348816px 5.548611164093018px 0px
    hsla(0, 0%, 0%, 0.06);
  box-shadow: 3.026146173477173px 7.565365791320801px 11.48888874053955px 0px
    hsla(0, 0%, 0%, 0.09);
  box-shadow: 7.427813529968262px 18.569534301757812px 22.912500381469727px 0px
    hsla(0, 0%, 0%, 0.12);
  box-shadow: 14.305418968200684px 35.763545989990234px 44.911109924316406px 0px
    hsla(0, 0%, 0%, 0.14);
  box-shadow: 24.071617126464844px 60.179046630859375px 82.57638549804688px 0px
    hsla(0, 0%, 0%, 0.17);
  box-shadow: 37.139068603515625px 92.84767150878906px 141px 0px
    hsla(0, 0%, 0%, 0.23);
`;

const TextInput = styled.input`
  height: 40px;
  margin-top: 16px;
  background-color: white;
  border: none;
  padding: 0px;
  padding-left: 12px;
  border-radius: 8px 0px 0px 8px;
  outline: none;
  font-size: 16px;
  flex-grow: 1;
`;

const Button = styled.button`
  margin-top: 16px;
  height: 40px;
  outline: none;
  border: none;
  border-radius: 0px 8px 8px 0px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  background: ${(props) => (props.enabled ? "#232388" : "#aaaaaa")};
  &:hover {
    background: #000088;
    cursor: ${(props) => (props.enabled ? "pointer" : "initial")};
  }
`;

const Warning = styled.div`
  padding: 16px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 32px;
  top: 30px;
  box-shadow: 3px 8px 10px 0px hsla(0, 0%, 0%, 0.4);
`;

function App() {
  const [fetchedUrl, setFetchedUrl] = useState(null);
  const [url, setUrlValue] = useState("");
  const [setting, setSetting] = useState(false);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchImageUrl() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(imageAddress, Image.abi, provider);
      try {
        const data = await contract.getUrl();
        setFetchedUrl(data);
        setSetting(false);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function setUrl() {
    if (!url || url.length === 0) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(imageAddress, Image.abi, signer);
      const transaction = await contract.setUrl(url);
      setUrlValue("");
      setSetting(true);
      await transaction.wait();
      fetchImageUrl();
    }
  }

  useEffect(() => {
    fetchImageUrl();
  }, []);

  return (
    <div className="App">
      {setting && (
        <Warning>
          <div class="lds-dual-ring"></div>
          Setting URL...
        </Warning>
      )}
      <header className="App-header">
        <div style={{ width: "90%", maxWidth: 500 }}>
          <Tilt
            gyroscope={true}
            glareEnable={true}
            glareMaxOpacity={0.8}
            glareColor="#ffffff"
            glarePosition="bottom"
            glareBorderRadius="20px">
            <Showcase src={fetchedUrl} />
          </Tilt>
        </div>
        <div
          style={{
            zIndex: 2,
            width: "90%",
            maxWidth: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <TextInput
            onChange={(e) => setUrlValue(e.target.value)}
            placeholder="Put a new image here"
            value={url}
          />
          <Button enabled={url.length > 0} onClick={setUrl}>
            Set url
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
