import Image from 'next/image';
import Link from 'next/link';
import images from '../assets';
import { PAYMENY_URL } from '../context/constants';

/**
 * PaymentButton Component
 * @returns
 */
const PaymentButton = () => (
  <Link href={PAYMENY_URL}>
    <Image
      src={images.paymentButton}
      width={100}
      height={20}
      objectFit="contain"
      classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
      alt="payment"
    />
  </Link>
);

export default PaymentButton;
