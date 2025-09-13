import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "module";
import Link from "next/link";

export function registerPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm justify-center items-center ">
        <CardHeader className="w-full max-w-sm justify-center items-center ">
          <CardTitle>Cadastre-se</CardTitle>
          <CardDescription>
            Utilize seu email e senha para acessar sua conta
          </CardDescription>
          <Button asChild variant="link" href="/login">
            <a>Ja possui uma conta?</a>
          </Button>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input id="password" type="password" required />
                <Label>Confirme sua senha</Label>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default registerPage;
