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
          Iniciar Sesion
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
