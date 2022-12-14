import { useState, useMemo, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import axios from 'axios';
import FormData from 'form-data';
import { NFTContext } from '../context/NFTContext';
import { Button, Input, Loader } from '../components';
import images from '../assets';
// infuraでipfs接続のために作成するclientインスタンスに使用
// const ipfsClient = require('ipfs-http-client');

// // projectIdとprojectSecretから認証情報作成
// const projectId = '2IYwC3nHSHhjw8BbTcd6JZJhwKN';
// const projectSecret = 'b251f6eae8f55ee11c11f41111cffe59';
// const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

// .envから読み込んだprojectIdとprojectSecretから認証情報作成
// const {
//   NEXT_PUBLIC_PROJECT_ID,
//   NEXT_PUBLIC_PROJECT_SECRET,
// } = process.env;
// const auth = `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_PROJECT_ID}:${process.env.NEXT_PUBLIC_PROJECT_SECRET}`).toString('base64')}`;

// // infuraを使用しclientインスタンス作成
// const client = ipfsClient.create({
//   host: 'infura-ipfs.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//     authorization: auth,
//   },
// });
// console.log(`client : ${client}`);

// pinataAPIでgatawayを使用しIPFSと接続するため各種値をセットする
const pinataApiKey = 'd14a91ce9e71974a5b4a';
const pinataApiSecret = 'e582916c77e4df2fc17837c7f98edec0edc4c3b7fbc17e68aefeb8ab36d9944f';
const pinataJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxNTBmMGM4MS04MDhkLTRhMTctYjJjYS04Zjg1YTEwODNkYjEiLCJlbWFpbCI6ImZjLmtpa2thd2FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImQxNGE5MWNlOWU3MTk3NGE1YjRhIiwic2NvcGVkS2V5U2VjcmV0IjoiZTU4MjkxNmM3N2U0ZGYyZmMxNzgzN2M3Zjk4ZWRlYzBlZGM0YzNiN2ZiYzE3ZTY4YWVmZWI4YWIzNmQ5OTQ0ZiIsImlhdCI6MTY3MDk5Mzg4Nn0.wSC9fcrTChwvT1jPecYQGQN0AqDMOxNzZNER553UXWI';
// APIにアクセスするためのベースとなるURL
const baseAPIUrl = 'https://api.pinata.cloud';

const CreateItem = () => {
  const { createSale, isLoadingNFT } = useContext(NFTContext);
  const [fileUrl, setFileUrl] = useState(null);
  const { theme } = useTheme();
  console.log(`fileUrl : ${fileUrl}`);

  // 画像をアップロードする時にipfsのgatawayと接続
  const uploadToInfura = async (file) => {
    try {
      // infuraを使用
      // const added = await client.add(file);
      // const url = `https://infura-ipfs.io/${added.path}`;

      // pinataのAPIによりIPFSと接続
      // APIを使って送信するリクエストパラメータを作成する。
      const postData = new FormData();
      postData.append('file', file);
      postData.append('pinataOptions', '{"cidVersion": 1}');
      postData.append('pinataMetadata', '{"name": "テストname", "keyvalues": {"company": "nearHotel"}}');
      console.log(`"postData: " ${postData}`);
      // pinataにアップロード
      const res = await axios.post(
        // APIのURL
        `${baseAPIUrl}/pinning/pinFileToIPFS`,
        // リクエストパラメータ
        postData,
        // ヘッダー情報
        {
          headers: {
            accept: 'application/json',
            pinata_api_key: `${pinataApiKey}`,
            pinata_secret_api_key: `${pinataApiSecret}`,
            'Content-Type': `multipart/form-data; boundary=${postData}`,
          },
        },
      );
      // CIDを取得
      console.log('CID:', res.data.IpfsHash);
      const url = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      console.log(`url : ${url}`);

      setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfura(acceptedFile[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  // add tailwind classes acording to the file status
  const fileStyle = useMemo(
    () => `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed  
       ${isDragActive ? ' border-file-active ' : ''} 
       ${isDragAccept ? ' border-file-accept ' : ''} 
       ${isDragReject ? ' border-file-reject ' : ''}`,
    [isDragActive, isDragReject, isDragAccept],
  );

  const [formInput, updateFormInput] = useState({
    price: '',
    name: '',
    description: '',
  });
  const router = useRouter();

  // NFTの名前、説明、画像などをNFTとしてIPFSにアップロード
  const createMarket = async () => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    // console.log(name);
    /* first, upload to IPFS */
    // const data = JSON.stringify({ name, description, image: fileUrl });
    // console.log(`"data: " ${data}`);
    try {
      // // infura to intract IPFS but not using now
      // const added = await client.add(data);
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      // using Pinata to intract IPFS
      // FormDataオブジェクトを生成
      // const postData = new FormData();
      // postData.append('file', data);
      // postData.append('pinataOptions', '{"cidVersion": 1}');
      // postData.append('pinataMetadata', '{"name": "テストname", "keyvalues": {"test": "marketplace"}}');
      // console.log(data);
      console.log('params: の前');
      // const params = new URLSearchParams();
      // params.append('name', name);
      // params.append('description', description);
      // params.append('image', fileUrl);
      // console.log(`"params: " ${params}`);
      const data = JSON.stringify({
        pinataOptions: {
          cidVersion: 1,
        },
        pinataMetadata: {
          name: 'testing',
          keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2',
          },
        },
        pinataContent: {
          name,
          description,
          image: fileUrl,
        },
      });

      const config = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        maxContentLength: 'Infinity',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: pinataJWT,
          pinata_api_key: '4c3bba8344657a640936',
          pinata_secret_api_key: '1a1a36e661bc408659aca1ad0527415e9096ba1f10d7e78a13e5c3a522d3f770',
        },
        data,
      };

      const res = await axios(config);

      console.log(res.data);
      // const res = await axios.post(
      //   // APIのURL
      //   'https://api.pinata.cloud/pinning/pinFileToIPFS',
      //   // リクエストパラメータ
      //   data,
      //   // ヘッダー情報
      //   {
      //     headers: {
      //       accept: 'application/jason',
      //       pinata_api_key: '4c3bba8344657a640936',
      //       pinata_secret_api_key: '1a1a36e661bc408659aca1ad0527415e9096ba1f10d7e78a13e5c3a522d3f770',
      //       'Content-Type': `application/json; boundary=${data}`,
      //     },
      //   },
      // );
      // CIDを取得
      console.log('CID:', res.data.IpfsHash);
      const url = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      console.log(`url : ${url}`);

      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      // console.log(url, formInput.price);
      await createSale(url, formInput.price);
      router.push('/');
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  if (isLoadingNFT) {
    return (
      <div className="flexCenter" style={{ height: '51vh' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          Create new item
        </h1>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload file
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className={theme === 'light' ? 'filter invert' : undefined}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag and Drop File
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  Or browse media on your device
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="Asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="Asset Name"
          handleClick={(e) => updateFormInput({ ...formInput, name: e.target.value })}
        />

        <Input
          inputType="textarea"
          title="Description"
          placeholder="Asset Description"
          handleClick={(e) => updateFormInput({ ...formInput, description: e.target.value })}
        />

        <Input
          inputType="number"
          title="Price"
          placeholder="Asset Price"
          handleClick={(e) => updateFormInput({ ...formInput, price: e.target.value })}
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="Create Item"
            btnType="primary"
            classStyles="rounded-xl"
            handleClick={createMarket}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
