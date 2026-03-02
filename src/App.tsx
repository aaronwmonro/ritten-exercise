import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">React + shadcn/ui</h1>
          <p className="text-muted-foreground">Your app is ready to build.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Counter</CardTitle>
            <CardDescription>A simple counter using shadcn Button</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-center">{count}</p>
          </CardContent>
          <CardFooter className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => setCount(c => c - 1)}>−</Button>
            <Button onClick={() => setCount(c => c + 1)}>+</Button>
            <Button variant="ghost" onClick={() => setCount(0)}>Reset</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Example Form</CardTitle>
            <CardDescription>shadcn Input and Label components</CardDescription>
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
          <CardFooter>
            <Button className="w-full">Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default App
