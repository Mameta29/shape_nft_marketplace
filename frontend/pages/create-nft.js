import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import axios from 'axios';
import FormData from 'form-data';
import images from '../assets';
import { Button, Input, Loader } from '../components';
import { NFTContext } from '../context/NFTContext';

// baseURI for pinata API
const baseAPIUrl = 'https://api.pinata.cloud';

/**
 * CreateItem component
 * @returns component
 */
const CreateItem = () => {
  const { createSale, isLoadingNFT } = useContext(NFTContext);
  const [fileUrl, setFileUrl] = useState(null);
  const [postedFile, SetPostedFile] = useState(null);
  const { theme } = useTheme();

  console.log(`fileUrl : ${fileUrl}`);

  const pinataApiKey = process.env.NEXT_PUBLIC_PROJECT_ID;
  const pinataApiSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;

  /**
   * uploadToInfura function
   * @param {*} file file data
   */
  const uploadToInfura = async (file) => {
    try {
      // create request params
      const postData = new FormData();
      postData.append('file', file);
      postData.append('pinataOptions', '{"cidVersion": 1}');
      postData.append('pinataMetadata', '{"name": "テストname", "keyvalues": {"company": "nearHotel"}}');
      console.log(`"postData: " ${postData}`);

      // upload to pinata
      const res = await axios.post(
        // APIのURL
        `${baseAPIUrl}/pinning/pinFileToIPFS`,
        // req params
        postData,
        // header
        {
          headers: {
            accept: 'application/json',
            pinata_api_key: `${pinataApiKey}`,
            pinata_secret_api_key: `${pinataApiSecret}`,
            'Content-Type': `multipart/form-data; boundary=${postData}`,
          },
        },
      );

      console.log('CID:', res.data.IpfsHash);
      const url = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      console.log(`url : ${url}`);

      SetPostedFile(file);
      setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  /**
   * onDrop callback function
   */
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

  /**
   * createMarket function
   */
  const createMarket = async () => {
    // get form datas
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;

    try {
      // create req param datas
      const postData = new FormData();
      postData.append('file', postedFile);
      postData.append('pinataOptions', '{"cidVersion": 1}');
      postData.append('pinataMetadata', '{"name": "テストname", "keyvalues": {"company": "nearHotel"}}');
      console.log(`"postData: " ${postData}`);

      // upload to pinata
      const res = await axios.post(
        // API
        `${baseAPIUrl}/pinning/pinFileToIPFS`,
        // req param data
        postData,
        // header
        {
          headers: {
            accept: 'application/json',
            pinata_api_key: `${pinataApiKey}`,
            pinata_secret_api_key: `${pinataApiSecret}`,
            'Content-Type': `multipart/form-data; boundary=${postData}`,
          },
        },
      );

      console.log(res.data);
      console.log('CID:', res.data.IpfsHash);
      const url = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      console.log(`url : ${url}`);

      /* after file is uploaded to IPFS, pass the URL to save it on Blockchain */
      // call createSale fuction
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
