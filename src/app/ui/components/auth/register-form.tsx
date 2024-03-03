import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { Button } from "../../button";
import LabelIcon from "../../label-icon";
import Input from "./input";

const RegistrationForm = () => {
  return (
    <div className="z-10 max-w-md mx-auto px-12 py-6 bg-white rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-8">Registration</h2>
      <form className="w-full">
        <label className="mb-4 flex items-center w-full">
          <LabelIcon icon={faUser} ariaLabel="Enter your name" />

          <Input
            id="text"
            name="name"
            type="text"
            placeholder="Name"
            required
          />
        </label>

        <label className="mb-4 flex items-center w-full">
          <LabelIcon icon={faEnvelope} ariaLabel="Enter your email" />

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </label>

        <label className="mb-4 flex items-center w-full">
          <LabelIcon icon={faLock} ariaLabel="Enter your password" />

          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </label>

        <Button type="submit" className="w-full mt-8">
          Register
        </Button>
      </form>

      <Link href="/login" className="mt-4  underline hover:text-orange-500">
        Sign in
      </Link>
    </div>
  );
};

export default RegistrationForm;
