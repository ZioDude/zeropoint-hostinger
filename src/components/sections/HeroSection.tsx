"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowRight, 
  Briefcase, 
  Zap, 
  Sparkles,
  ChevronDown,
  Palette,
  Code,
  Rocket,
  CheckCircle,
  LayoutTemplate,
  ShoppingCart,
  MousePointer,
  Package,
  Bot
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GridPattern from "@/components/magicui/GridPattern";
import { WordRotate } from "@/components/magicui/WordRotate";
import { AuroraText } from "@/components/magicui/aurora-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { BorderBeam } from "@/components/magicui/border-beam";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const leftColumnVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const processStepVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const benefitCardVariants: Variants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    scale: 0.8,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const iconVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.8,
      duration: 0.5,
      ease: "backOut",
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.4,
    },
  },
};

const textVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const processSteps = [
  {
    icon: Palette,
    title: "Design",
    description: "We create stunning, user-focused designs tailored to your brand and goals.",
    step: "01",
  },
  {
    icon: Code,
    title: "Develop",
    description: "Our expert developers bring your design to life with clean, efficient code.",
    step: "02", 
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "We launch your website and ensure everything runs smoothly from day one.",
    step: "03",
  },
];

// TypeWriter component for text animation
const TypeWriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.1 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + index * 0.02,
            duration: 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const benefits = [
  {
    icon: Code,
    title: "Next.js Development",
    description: {
      intro: "Beautiful business websites with powerful integrations and advanced functionality. Scale into full platforms with AI features like chatbots and virtual consultants.",
      features: [
        "Unlimited integrations with any business tool",
        "AI chatbots & virtual consultants built-in",
        "Transform into full business platforms",
        "Advanced functionality & custom features",
        "Example: Customer portals with AI support",
        "Example: Booking systems with smart automation"
      ]
    },
    brandColor: "text-slate-100",
    brandBg: "bg-slate-800/30",
    brandBorder: "border-slate-600/30",
    ctaText: "Build Your Platform",
    buttonIcon: Rocket,
    buttonClasses: "bg-transparent border-2 border-slate-500 text-slate-300 hover:bg-slate-700 hover:text-slate-100 hover:border-slate-700",
  },
  {
    icon: LayoutTemplate,
    title: "Platform Websites",
    description: {
      intro: "We build on any platform you're familiar with - Wix, WordPress, or others. Perfect if you want to edit content yourself or have experience with these tools.",
      features: [
        "Wix, WordPress, or your preferred platform",
        "You can edit content yourself after launch",
        "Built on platforms you already know",
        "Quick setup if you're familiar with the tools",
        "Example: WordPress sites for experienced users",
        "Example: Wix sites for easy self-editing"
      ]
    },
    brandColor: "text-blue-400",
    brandBg: "bg-blue-500/15",
    brandBorder: "border-blue-500/30",
    ctaText: "Choose Your Platform",
    buttonIcon: MousePointer,
    buttonClasses: "bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 hover:border-blue-500/30",
  },
  {
    icon: ShoppingCart,
    title: "Shopify Stores",
    description: {
      intro: "E-commerce platforms designed to maximize conversions and sales, for businesses of all sizes looking to sell products online effectively.",
      features: [
        "Payment processing ready for immediate sales",
        "Inventory management to track stock levels",
        "Custom themes & apps for unique branding",
        "Example: Fashion & clothing online stores",
        "Example: Electronics & gadget shops",
        "Example: Local food & grocery delivery"
      ]
    },
    brandColor: "text-green-400",
    brandBg: "bg-green-500/15",
    brandBorder: "border-green-500/30",
    ctaText: "Launch Your Store",
    buttonIcon: Package,
    buttonClasses: "bg-transparent border-2 border-green-500 text-green-400 hover:bg-green-500/30 hover:text-green-300 hover:border-green-500/30",
  },
  {
    icon: Zap,
    title: "Workflow Automations",
    description: {
      intro: "Automate any business process with any app you can think of. From lead generation to email/SMS campaigns and everything in between.",
      features: [
        "Connect any app or tool you use",
        "Lead generation to CRM automation",
        "Email & SMS campaign automation",
        "Social media, scheduling, and more",
        "Example: Website leads → CRM → Email sequence",
        "Example: New sale → SMS notification → Inventory update"
      ]
    },
    brandColor: "text-orange-400",
    brandBg: "bg-orange-500/15",
    brandBorder: "border-orange-500/30",
    ctaText: "Automate Everything",
    buttonIcon: Bot,
    buttonClasses: "bg-transparent border-2 border-orange-500 text-orange-400 hover:bg-orange-500/30 hover:text-orange-300 hover:border-orange-500/30",
  },
];

// Individual card component with scroll trigger
const BenefitCard = ({ benefit, index }: { benefit: typeof benefits[0], index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const direction = index % 2 === 0 ? -1 : 1; // Alternating left/right

  return (
    <motion.div
      ref={cardRef}
      custom={direction}
      variants={benefitCardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative"
    >
      <Card className="h-full bg-neutral-850/80 backdrop-blur-md border border-neutral-700/80 rounded-xl shadow-xl hover:border-orange-500/60 hover:shadow-[0_0_40px_-10px_theme(colors.orange.500/0.5)] transition-all duration-300 flex flex-col overflow-hidden group/benefitcard">
        <CardHeader className="p-6 pb-4 border-b border-neutral-700/50">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className={`flex-shrink-0 p-3.5 ${benefit.brandBg} border ${benefit.brandBorder} rounded-lg group-hover/benefitcard:scale-105 transition-transform duration-300`}
              variants={iconVariants}
            >
              <benefit.icon className={`w-8 h-8 ${benefit.brandColor}`} />
            </motion.div>
            <motion.div variants={titleVariants}>
              <CardTitle className="text-2xl xl:text-3xl font-semibold text-slate-100">
                <TypeWriter text={benefit.title} delay={0.3} />
              </CardTitle>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-5 flex-grow flex flex-col">
          <motion.div className="space-y-4 flex-grow" variants={textVariants}>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-6">
              <TypeWriter text={benefit.description.intro} delay={0.5} />
            </p>
            <motion.ul
              className="text-sm text-slate-400 space-y-3"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 1.2,
                  },
                },
              }}
            >
              {benefit.description.features.map((feature, featureIndex) => {
                const isExample = feature.toLowerCase().startsWith("example:");
                return (
                  <motion.li key={featureIndex} variants={listItemVariants} className="flex items-start">
                    {isExample ? (
                      <CheckCircle className="w-4 h-4 mr-2.5 mt-[3px] text-green-400 flex-shrink-0" />
                    ) : (
                      <span className="mr-2.5 mt-1 text-orange-500 flex-shrink-0">•</span>
                    )}
                    <div className={isExample ? 'text-slate-400' : 'text-slate-300'}>
                      {isExample ? (
                        <>
                          <span className="font-semibold text-green-300">{feature.substring(0, feature.indexOf(':') + 1)}</span>
                          <span className="italic">{feature.substring(feature.indexOf(':') + 1)}</span>
                        </>
                      ) : (
                        <>
                          <span className="font-medium">{feature.split(':')[0]}</span>
                          {feature.includes(':') ? (
                            <span className="text-slate-400">{':' + feature.slice(feature.indexOf(':') + 1)}</span>
                          ) : (
                            ''
                          )}
                        </>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
          <motion.div className="mt-auto pt-8" variants={itemVariants}>
            <Button
              className={`w-full group ${benefit.buttonClasses} 
                          font-semibold transition-all duration-200 py-3 text-base rounded-lg
                          shadow-sm hover:shadow-md transform hover:scale-[1.02] flex items-center justify-center`}
            >
              <benefit.buttonIcon className={`w-5 h-5 mr-2`} />
              {benefit.ctaText}
              <ArrowRight className="w-5 h-5 ml-auto transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function HeroSection() {
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const processRef = useRef(null);
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });

  // Sequential BorderBeam animation for process steps
  useEffect(() => {
    if (!isProcessInView) return;

    const interval = setInterval(() => {
      setActiveProcessStep((prev) => (prev + 1) % processSteps.length);
    }, 3000); // 3 seconds per step

    return () => clearInterval(interval);
  }, [isProcessInView]);

  return (
    <motion.section
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 md:py-24 overflow-hidden bg-[#0A0A0A] text-slate-100 isolate"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        className={
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] " +
          "fixed inset-0 z-0 stroke-neutral-700/50 fill-neutral-800/30"
        }
      />
      
      {/* Main Hero Content - Centered */}
      <div className="container mx-auto z-10 max-w-4xl text-center space-y-8 md:space-y-12">
        
        {/* Header Section */}
        <motion.div 
          className="flex flex-col items-center space-y-6 md:space-y-8"
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-orange-500/60 shadow-lg">
              <AvatarFallback className="bg-orange-600/20 text-orange-400 text-lg">
                🇨🇾
              </AvatarFallback>
            </Avatar>
            <Badge
              variant="outline"
              className="border-orange-500/70 text-orange-400 bg-orange-950/60 px-5 py-2 text-sm font-semibold rounded-full shadow-md shadow-orange-900/60"
            >
              Cyprus Web Agency ✨
            </Badge>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight !leading-tight"
          >
            <div className="text-slate-50 mb-2 md:mb-4">
              We Craft
            </div>
            <WordRotate
              words={[
                <AuroraText key="word1" className="text-orange-500 block" colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]} speed={1.5}>Beautiful Websites</AuroraText>,
                <AuroraText key="word2" className="text-orange-500 block" colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]} speed={1.5}>Digital Experiences</AuroraText>,
                <AuroraText key="word3" className="text-orange-500 block" colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]} speed={1.5}>E-commerce Stores</AuroraText>,
                <AuroraText key="word4" className="text-orange-500 block" colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]} speed={1.5}>Landing Pages</AuroraText>,
                <AuroraText key="word5" className="text-orange-500 block" colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]} speed={1.5}>Web Applications</AuroraText>,
              ]}
              duration={2500}
              motionProps={{
                initial: { opacity: 0, y: 30, scale: 0.9 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: -30, scale: 0.9 },
                transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              }}
            />
            <div className="text-slate-50 mt-2 md:mt-4 flex items-baseline justify-center">
              <span>That&nbsp;</span>
              <SparklesText 
                as={<span />}
                className="text-white text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold"
                colors={{ first: "#FDBA74", second: "#F97316" }}
                sparklesCount={1}
              >
                Convert
              </SparklesText>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-slate-300/90 font-medium"
          >
            Transform your ideas into high-converting websites. We handle the complete journey from design to deployment, ensuring your online presence drives real results.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Starting at €350</span>
            </div>
            <div className="w-1 h-4 bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>7-14 day delivery</span>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="w-full max-w-lg pt-1 pb-2 md:pt-2 md:pb-3">
              <Separator className="bg-neutral-700/80" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <Link href="/start-project">
              <Button
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-slate-950 font-bold py-4 px-8 text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] border-0"
              >
                <span className="flex items-center relative z-10">
                  Get Your Website Built
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="group text-slate-300 border-slate-600 hover:border-orange-500/90 hover:bg-orange-500/10 hover:text-orange-400 font-semibold py-4 px-8 text-base shadow-lg shadow-black/20 hover:shadow-orange-500/20 transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
              >
                <span className="flex items-center">
                  View Our Work
                  <Briefcase className="w-5 h-5 ml-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Our Process Section - Centered Below */}
      <motion.div 
        ref={processRef}
        className="container mx-auto z-10 mt-16 md:mt-20 lg:mt-24 max-w-4xl"
        variants={leftColumnVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-100 mb-4">
            Our <span className="text-orange-500">Process</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            From concept to launch in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={processStepVariants}
              className="relative"
              animate={{
                scale: activeProcessStep === index ? 1.05 : 1,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className={`relative flex flex-col items-center text-center p-6 md:p-8 rounded-xl border backdrop-blur-md transition-all duration-500 overflow-hidden h-[280px] md:h-[320px] ${
                activeProcessStep === index 
                  ? 'border-orange-500/50 bg-neutral-800/50 shadow-lg shadow-orange-500/20' 
                  : 'border-neutral-700/50 bg-neutral-800/30 hover:scale-[1.02]'
              }`}>
                {activeProcessStep === index && (
                  <BorderBeam
                    size={100}
                    duration={4}
                    colorFrom="#F97316"
                    colorTo="#F97316"
                  />
                )}
                <div className="flex-shrink-0 relative z-10 mb-4">
                  <motion.div 
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl border flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                      activeProcessStep === index
                        ? 'bg-orange-500/20 border-orange-500/50'
                        : 'bg-neutral-700/50 border-neutral-600/50'
                    }`}
                    animate={{
                      scale: activeProcessStep === index ? 1.1 : 1,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <step.icon className={`w-8 h-8 md:w-10 md:h-10 transition-colors duration-300 ${
                      activeProcessStep === index ? 'text-orange-400' : 'text-slate-300'
                    }`} />
                  </motion.div>
                </div>
                <div className="flex-grow relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <h3 className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                      activeProcessStep === index ? 'text-orange-300' : 'text-slate-200'
                    }`}>
                      {step.title}
                    </h3>
                    <span className={`text-sm font-mono px-2 py-1 rounded transition-all duration-300 ${
                      activeProcessStep === index 
                        ? 'text-orange-400 bg-orange-500/20' 
                        : 'text-slate-400 bg-neutral-700/50'
                    }`}>
                      {step.step}
                    </span>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex items-center justify-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg mt-8 max-w-md mx-auto"
          variants={processStepVariants}
        >
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-green-300 text-base font-medium">
            Average delivery time: 7-14 days
          </span>
        </motion.div>
      </motion.div>

      {/* Benefits Section - Full Width Below with Scroll Effects */}
      <motion.div 
        className="container mx-auto z-10 mt-16 md:mt-24 lg:mt-32 px-4"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          variants={itemVariants} 
          className="text-3xl sm:text-4xl font-bold text-center mb-10 md:mb-12 flex items-center justify-center"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="w-8 h-8 mr-3 text-orange-500" />
          </motion.div>
          <span className="bg-gradient-to-r from-slate-100 via-orange-400 to-slate-100 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Our Creation Methods
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
