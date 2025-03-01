"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FAQ() {
  return (
    <section id="faq" className="w-full py-20 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Find answers to common questions about our stack
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid gap-6 max-w-3xl mx-auto">
          <ScrollReveal delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle>How do I add more shadcn/ui components?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can add components using the CLI command: <code className="px-1 py-0.5 bg-muted rounded">npx shadcn@latest add [component-name]</code>
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>Is this stack suitable for production?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely! Next.js, Tailwind CSS, and shadcn/ui are all production-ready technologies used by thousands of companies.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle>How do I customize the theme?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can customize the theme by editing the globals.css file and the tailwind.config.js file to match your brand's colors and styles.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <Card>
              <CardHeader>
                <CardTitle>Can I use this with other UI libraries?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! shadcn/ui is designed to be used alongside other UI libraries, and since it's not a traditional dependency, there are no conflicts.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
} 