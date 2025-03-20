"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import {
  Shield,
  Zap,
  ArrowRight,
  Bitcoin,
  Hexagon,
  CheckCircle,
  AlertTriangle,
  Lock,
  ExternalLink,
  ChevronRight,
  Star,
  BarChart3,
  Globe,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }[] = []

    const createParticles = () => {
      const particleCount = Math.min(window.innerWidth / 10, 100)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color:
            i % 3 === 0
              ? "rgba(245, 215, 66, 0.3)"
              : i % 3 === 1
                ? "rgba(229, 57, 53, 0.2)"
                : "rgba(255, 255, 255, 0.1)",
        })
      }
    }

    createParticles()

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(245, 215, 66, ${0.1 - distance / 1000})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].x += particles[i].speedX
        particles[i].y += particles[i].speedY

        if (particles[i].x > canvas.width || particles[i].x < 0) {
          particles[i].speedX = -particles[i].speedX
        }

        if (particles[i].y > canvas.height || particles[i].y < 0) {
          particles[i].speedY = -particles[i].speedY
        }

        ctx.beginPath()
        ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2)
        ctx.fillStyle = particles[i].color
        ctx.fill()
      }

      connectParticles()
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles.length = 0
      createParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70" />
}

const StatCard = ({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeIn}
      className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,215,66,0.3)] group"
    >
      <div className="bg-black/50 rounded-xl p-3 inline-block mb-4 group-hover:bg-yellow-500/20 transition-all duration-300">
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1 flex items-end">
        {inView ? <CountUp end={value} duration={2.5} separator="," /> : 0}
        <span className="text-yellow-500 ml-1">+</span>
      </div>
      <p className="text-gray-400">{label}</p>
    </motion.div>
  )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <motion.div
      variants={fadeIn}
      className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,215,66,0.3)] group"
    >
      <div className="bg-black/50 rounded-xl p-3 inline-block mb-4 group-hover:bg-yellow-500/20 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-all duration-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

const testimonials = [
  {
    quote: "AMLSafe has transformed how we handle compliance. Their platform is intuitive and powerful.",
    author: "Sarah Johnson",
    position: "Compliance Officer, CryptoTrade Inc.",
    rating: 5,
  },
  {
    quote:
      "The risk assessment tools are incredibly accurate. We've caught several suspicious transactions that would have slipped through.",
    author: "Michael Chen",
    position: "Security Director, BlockFin",
    rating: 5,
  },
  {
    quote:
      "Implementation was seamless and the support team is always responsive. Highly recommended for any crypto business.",
    author: "Elena Rodriguez",
    position: "CEO, DeFi Solutions",
    rating: 4,
  },
]

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      <header className="border-b border-yellow-600/20 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 relative z-10">
            <div className="bg-yellow-500 rounded-md p-2 shadow-[0_0_10px_rgba(245,215,66,0.5)]">
              <Shield className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-yellow-500">AMLSafe</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#product" className="text-gray-300 hover:text-yellow-500 transition-colors relative group">
              Product
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#features" className="text-gray-300 hover:text-yellow-500 transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-yellow-500 transition-colors relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-yellow-500 transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-md relative overflow-hidden group">
            <span className="relative z-10 flex items-center">
              Get Started{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 border-b border-yellow-600/20">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-yellow-900/20 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-8">
                <motion.div
                  variants={fadeIn}
                  className="inline-flex items-center gap-2 bg-red-900/30 border border-red-500/30 rounded-full px-4 py-1"
                >
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Secure AML Compliance</span>
                </motion.div>

                <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="text-white">Trust, but</span>{" "}
                  <span className="text-yellow-500 relative">
                    verify
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-500/50"></span>
                  </span>{" "}
                  <Zap className="inline-block h-10 w-10 text-yellow-500" />
                </motion.h1>

                <motion.p variants={fadeIn} className="text-xl text-gray-400">
                  The first preventive AML solution for crypto transactions. Protect your assets and stay compliant with
                  regulatory requirements.
                </motion.p>

                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium text-lg px-8 py-6 rounded-md relative overflow-hidden group">
                    <span className="relative z-10 flex items-center">Start Free Trial</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 font-medium text-lg px-8 py-6 rounded-md group"
                  >
                    <span className="flex items-center">
                      Watch Demo{" "}
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </motion.div>

                <motion.div variants={fadeIn} className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-red-500 border-2 border-black"
                      ></div>
                    ))}
                  </div>
                  <p>
                    Trusted by <span className="text-yellow-500 font-medium">2,000+</span> crypto businesses
                  </p>
                </motion.div>
              </div>

              <motion.div variants={fadeIn} className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-yellow-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-gradient-to-r from-gray-900 to-black border border-yellow-500/20 rounded-3xl p-6 shadow-2xl hover:border-yellow-500/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,215,66,0.2)]">
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    LIVE
                  </div>
                  <div className="bg-black rounded-2xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-400">Transaction Risk Score</p>
                        <h3 className="text-2xl font-bold text-white">
                          87<span className="text-red-500">/100</span>
                        </h3>
                      </div>
                      <div className="bg-red-500/20 border border-red-500/30 rounded-full p-2 animate-pulse">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                      </div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-yellow-500 to-red-500 h-2.5 rounded-full animate-[pulse_2s_ease-in-out_infinite]"
                        style={{ width: "87%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-800 hover:border-red-500/30 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="bg-black p-2 rounded-full group-hover:bg-red-500/10 transition-all duration-300">
                          <Bitcoin className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <p className="font-medium">Bitcoin</p>
                          <p className="text-xs text-gray-400">0x7ef9...a3b2</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-500 font-medium">High Risk</span>
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="bg-black p-2 rounded-full group-hover:bg-yellow-500/10 transition-all duration-300">
                          <Hexagon className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <p className="font-medium">Ethereum</p>
                          <p className="text-xs text-gray-400">0x3af1...c4d9</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500 font-medium">Medium Risk</span>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-800 hover:border-green-500/30 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="bg-black p-2 rounded-full group-hover:bg-green-500/10 transition-all duration-300">
                          <Lock className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <p className="font-medium">USDC</p>
                          <p className="text-xs text-gray-400">0x8bc2...f7e5</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500 font-medium">Low Risk</span>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-medium py-3 rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(245,215,66,0.4)] hover:shadow-[0_6px_20px_rgba(245,215,66,0.6)]">
                    Generate Full Report
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-b border-yellow-600/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard
                icon={<Shield className="h-8 w-8 text-yellow-500" />}
                value={5000}
                label="Transactions Secured"
              />
              <StatCard
                icon={<AlertTriangle className="h-8 w-8 text-yellow-500" />}
                value={350}
                label="Threats Detected"
              />
              <StatCard icon={<Users className="h-8 w-8 text-yellow-500" />} value={2000} label="Active Users" />
              <StatCard icon={<Globe className="h-8 w-8 text-yellow-500" />} value={40} label="Countries Covered" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 border-b border-yellow-600/20">
          <div className="container mx-auto px-4">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1 mb-4">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Powerful Features</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Advanced AML <span className="text-yellow-500">Protection</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our platform provides comprehensive anti-money laundering checks for all your crypto transactions
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <AlertTriangle className="h-10 w-10 text-yellow-500" />,
                  title: "Phishing Warning",
                  description: "Real-time alerts for suspicious wallet addresses and potential scam attempts",
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-yellow-500" />,
                  title: "Next-Gen Checks",
                  description: "Advanced algorithms to detect unusual patterns and high-risk transactions",
                },
                {
                  icon: <Shield className="h-10 w-10 text-yellow-500" />,
                  title: "Regulatory Compliance",
                  description: "Stay compliant with global AML regulations and avoid legal complications",
                },
                {
                  icon: <Zap className="h-10 w-10 text-yellow-500" />,
                  title: "Real-time Monitoring",
                  description: "Continuous monitoring of all transactions with instant risk assessment",
                },
                {
                  icon: <Lock className="h-10 w-10 text-yellow-500" />,
                  title: "Secure Verification",
                  description: "Multi-layer verification process to ensure maximum security",
                },
                {
                  icon: <ExternalLink className="h-10 w-10 text-yellow-500" />,
                  title: "Web3 Integration",
                  description: "Seamless integration with all major wallets and blockchain platforms",
                },
              ].map((feature, index) => (
                <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 border-b border-yellow-600/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1 mb-4">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Simple Process</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                How <span className="text-yellow-500">It Works</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our platform makes AML compliance simple and effective
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-500/50 to-red-500/50 transform -translate-y-1/2 hidden md:block"></div>

              {[
                {
                  step: 1,
                  title: "Connect Your Wallet",
                  description: "Securely connect your crypto wallet or exchange account to our platform",
                  icon: <Bitcoin className="h-8 w-8 text-yellow-500" />,
                },
                {
                  step: 2,
                  title: "Analyze Transactions",
                  description: "Our AI-powered system analyzes transactions for suspicious patterns",
                  icon: <BarChart3 className="h-8 w-8 text-yellow-500" />,
                },
                {
                  step: 3,
                  title: "Get Detailed Reports",
                  description: "Receive comprehensive reports with risk scores and compliance recommendations",
                  icon: <CheckCircle className="h-8 w-8 text-yellow-500" />,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.2,
                      },
                    },
                  }}
                  className="relative z-10"
                >
                  <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,215,66,0.3)] h-full flex flex-col items-center text-center">
                    <div className="bg-yellow-500 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center mb-6 relative">
                      {step.step}
                      <div className="absolute -inset-1 rounded-full border border-yellow-500/50 animate-ping"></div>
                    </div>
                    <div className="bg-black/50 rounded-xl p-4 mb-4">{step.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 border-b border-yellow-600/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1 mb-4">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Client Testimonials</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                What Our <span className="text-yellow-500">Clients Say</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Trusted by leading crypto businesses around the world
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-r from-gray-900 to-black border border-yellow-500/20 rounded-3xl p-8 shadow-2xl">
                <div className="absolute -top-5 -left-5 text-yellow-500 text-6xl opacity-30">"</div>
                <div className="absolute -bottom-5 -right-5 text-yellow-500 text-6xl opacity-30">"</div>

                <div className="relative">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={`transition-opacity duration-500 ${activeTestimonial === index ? "opacity-100" : "opacity-0 absolute inset-0"}`}
                    >
                      <p className="text-xl text-gray-300 italic mb-6">{testimonial.quote}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white">{testimonial.author}</p>
                          <p className="text-gray-400 text-sm">{testimonial.position}</p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-500" : "text-gray-600"}`}
                              fill={i < testimonial.rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-8 gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === index ? "bg-yellow-500 w-6" : "bg-gray-600"}`}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Blockchains */}
        <section className="py-20 border-b border-yellow-600/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1 mb-4">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Wide Coverage</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Supported <span className="text-yellow-500">Blockchains</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We support all major cryptocurrencies and blockchain networks
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-8"
            >
              {[
                { name: "Bitcoin", icon: <Bitcoin className="h-8 w-8" /> },
                { name: "Ethereum", icon: <Hexagon className="h-8 w-8" /> },
                { name: "Solana", icon: "SOL" },
                { name: "Polygon", icon: "MATIC" },
                { name: "Binance", icon: "BNB" },
                { name: "Avalanche", icon: "AVAX" },
                { name: "Cardano", icon: "ADA" },
                { name: "Polkadot", icon: "DOT" },
              ].map((chain, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="flex items-center gap-3 bg-gray-900 rounded-full px-6 py-3 border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,215,66,0.3)] group"
                >
                  <div className="bg-black p-2 rounded-full group-hover:bg-yellow-500/10 transition-all duration-300">
                    {typeof chain.icon === "string" ? (
                      <span className="text-yellow-500 font-bold">{chain.icon}</span>
                    ) : (
                      chain.icon
                    )}
                  </div>
                  <span className="font-medium">{chain.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-gradient-to-r from-red-900/30 to-yellow-900/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-yellow-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-red-500/10 rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Secure your crypto transactions <span className="text-yellow-500">today</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join thousands of businesses and individuals who trust AMLSafe for their crypto compliance needs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium text-lg px-8 py-6 rounded-md relative overflow-hidden group">
                    <span className="relative z-10">Start Free Trial</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 font-medium text-lg px-8 py-6 rounded-md group"
                  >
                    <span className="flex items-center">
                      Contact Sales{" "}
                      <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-black border-t border-yellow-600/20 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="bg-yellow-500 rounded-md p-2">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <span className="text-2xl font-bold text-yellow-500">AMLSafe</span>
              </Link>
              <p className="text-gray-400 mb-4">The leading AML compliance solution for cryptocurrency transactions</p>
              <div className="flex gap-4">
                {["Twitter", "LinkedIn", "GitHub", "Discord"].map((social, index) => (
                  <Link key={index} href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    {social}
                  </Link>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Security", "Pricing", "API"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Blog", "Guides", "Support"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Privacy Policy"],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-bold text-lg mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-yellow-600/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} AMLSafe. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

