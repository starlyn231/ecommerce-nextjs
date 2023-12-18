import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { lato } from '../util/fonts';


export default function AcmeLogo() {
  return (
    <div
      className={`${lato.className} flex flex-row items-cente ju leading-none text-white`}
    >
      <ShoppingBagIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[36px]">BuyAll</p>
    </div>
  );
}
