import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@/ui/components/button";
// import Icon from "@/ui/components/icon";

export default function Page() {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-xl font-semibold mb-8">Shopping list</h2>

      <div className="flex justify-between space-x-2 mb-4 bg-[--primary-color] text-white p-2 rounded-lg">
        <div className="w-1/2">Product</div>
        <div className="w-1/4 flex justify-center">Quantity</div>
        <div className="w-1/4 flex justify-center">Remove</div>
      </div>
      <ul className="px-2">
        <li className="flex justify-between space-x-2 items-center pb-2 border-b border-gray-300">
          <div className="w-1/2">Milk</div>
          <div className="w-1/4 flex justify-center">1 liter</div>
          <div className="w-1/4 flex justify-center">
            <Button variant="icon">
              <FontAwesomeIcon
                icon={faXmark}
                aria-label="Remove"
                className="h-4 w-4"
              />
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );
}
