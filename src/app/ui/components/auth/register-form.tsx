import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { Button } from "../button";
import Input from "../input";

const RegistrationForm = () => {
  return (
    <div className="z-10 max-w-md mx-auto px-12 py-6 bg-white rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-8">Registration</h2>
      <form className="w-full">
        <label className="mb-4 flex items-center w-full">
          <Input
            id="text"
            name="name"
            type="text"
            placeholder="Name"
            required
            iconID="icon-user"
          />
        </label>

        <label className="mb-4 flex items-center w-full">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            iconID="icon-mail"
          />
        </label>

        <label className="mb-4 flex items-center w-full">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            iconID="icon-lock"
          />
        </label>

        <Button type="submit" className="w-full mt-8" variant="secondary">
          Register
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-4  underline hover:text-[--primary-color]"
      >
        Sign in
      </Link>
    </div>
  );
};

export default RegistrationForm;
