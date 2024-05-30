"use client";

import Link from "next/link";
import Image from "next/image";
import { Formik, Form, FormikHelpers } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@ui/components/button";
import IconInput from "@ui/components/icon-input";
import { loginValidationSchema } from "@utils/validationSchemas";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { email, password } = values;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        // console.log(res);
        setGlobalError("Invalid credentials");
      } else {
        console.log("Login successful");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
      setGlobalError("Login failed. Please try again.");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="z-10 max-w-md w-[90vw] mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
        method="POST"
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center" autoComplete="off">
            <h2 className="heading-l">Sign in</h2>
            <IconInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              iconID="icon-user"
              label="Email"
            />

            <IconInput
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              iconID="icon-lock"
              label="Password"
            />

            {globalError && <div className="error-text">{globalError}</div>}

            <Button type="submit" className="w-full mt-6 mb-4">
              {isSubmitting ? "Logging in..." : "Sign in"}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex justify-center w-full items-center gap-3 py-4">
        <div className="border-b border-[--gray] w-full" />
        <div>or</div>
        <div className="border-b border-[--gray] w-full" />
      </div>

      <button onClick={() => signIn("google")}>
        <Image
          src="/google_signin.svg"
          alt="Google Logo"
          className="dark:invert"
          width={175}
          height={40}
          priority
        />
      </button>

      <div className="mt-10">
        <span>Don&#39;t have an account? </span>
        <Link href="/register" className="underline hover-green">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
