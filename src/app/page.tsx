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

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Next.js + shadcn/ui</h1>
          <p className="text-muted-foreground">Your app is ready to build.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Example Form</CardTitle>
            <CardDescription>shadcn Input, Label, and Button components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button className="flex-1">Submit</Button>
            <Button variant="outline">Cancel</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
