import Image from "next/image";
import { signIn } from "next-auth/client";
import Button from "@material-tailwind/react/Button";

function Login() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center py-2">
      <Image
        src="https://links.papareact.com/1ui"
        height="250"
        width="450"
        objectFit="contain"
      />
      <Button
        className="w-44 mt-10"
        color="blue"
        buttonType="filled"
        ripple="light"
        onClick={signIn}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
