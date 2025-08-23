import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h4 className="text-2xl text-center font-bold">Crea tu cuenta</h4>
        </CardTitle>
        <CardDescription className="text-center">
          Completa tus datos para acceder a la aplicación
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
