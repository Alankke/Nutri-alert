import { SignInForm } from "@/features/auth/components/sign-in-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h4 className="text-2xl text-center font-bold">Iniciar Sesion</h4>
        </CardTitle>
        <CardDescription className="text-center">
          Inserta tus credenciales para acceder a tu panel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}
