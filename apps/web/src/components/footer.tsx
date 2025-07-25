"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { RiGithubLine, RiTwitterXLine } from "react-icons/ri";
import { getStars } from "@/lib/fetch-github-stars";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
  const [star, setStar] = useState<string>();
  const t = useTranslations('navigation');
  const tFooter = useTranslations('footer');

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const data = await getStars();
        setStar(data);
      } catch (err) {
        console.error("Failed to fetch GitHub stars", err);
      }
    };

    fetchStars();
  }, []);

  return (
    <motion.footer
      className="bg-background border-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1 max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.svg" alt="OpenCut" width={24} height={24} />
              <span className="font-bold text-lg">OpenCut</span>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              {tFooter('description')}
            </p>
            <div className="flex gap-3">
              <Link
                href="https://github.com/OpenCut-app/OpenCut"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiGithubLine className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/OpenCutApp"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiTwitterXLine className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="flex gap-12 justify-end items-start py-2">
            <div>
              <h3 className="font-semibold text-foreground mb-4">{tFooter('resources')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tFooter('privacyPolicy')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tFooter('termsOfUse')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">{tFooter('company')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/contributors"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t('contributors')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/OpenCut-app/OpenCut/blob/main/README.md"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tFooter('about')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{tFooter('copyright')}</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
