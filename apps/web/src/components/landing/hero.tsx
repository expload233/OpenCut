"use client";

import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Handlebars } from "./handlebars";

interface HeroProps {
  signupCount: number;
}

export function Hero({ signupCount }: HeroProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const tMessages = useTranslations('messages');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: tMessages('emailRequired'),
        description: tMessages('emailRequiredDesc'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = (await response.json()) as { error: string };

      if (response.ok) {
        toast({
          title: tMessages('welcomeWaitlist'),
          description: tMessages('welcomeWaitlistDesc'),
        });
        setEmail("");
      } else {
        toast({
          title: tMessages('oops'),
          description:
            (data as { error: string }).error ||
            tMessages('somethingWrong'),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: tMessages('networkError'),
        description: tMessages('networkErrorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] supports-[height:100dvh]:min-h-[calc(100dvh-4.5rem)] flex flex-col justify-between items-center text-center px-4">
      <Image
        className="absolute top-0 left-0 -z-50 size-full object-cover"
        src="/landing-page-bg.png"
        height={1903.5}
        width={1269}
        alt="landing-page.bg"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-block font-bold tracking-tighter text-4xl md:text-[4rem]"
        >
          <h1>{t('title')}</h1>
          <div className="flex justify-center gap-4 leading-[4rem] mt-0 md:mt-2">
            <div className="relative -rotate-[2.76deg] max-w-[250px] md:max-w-[454px] mt-2">
              <Image src="/frame.svg" height={79} width={459} alt="frame" />
              <span className="absolute inset-0 flex items-center justify-center">
                Video Editor
              </span>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="mt-10 text-base sm:text-xl text-muted-foreground font-light tracking-wide max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          className="mt-12 flex gap-8 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex gap-3 w-full max-w-lg flex-col sm:flex-row"
          >
            <div className="relative w-full">
              <Input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="h-11 text-base flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="px-6 h-11 text-base !bg-foreground"
              disabled={isSubmitting}
            >
              <span className="relative z-10">
                {isSubmitting ? t('joinWaitlistLoading') : t('joinWaitlist')}
              </span>
              <ArrowRight className="relative z-10 ml-0.5 h-4 w-4 inline-block" />
            </Button>
          </form>
        </motion.div>

        {signupCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground justify-center"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>{t('peopleJoined', { count: signupCount.toLocaleString() })}</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
