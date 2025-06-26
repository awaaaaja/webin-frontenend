
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrderProvider } from "./contexts/OrderContext";
import Index from "./pages/Index";
import DomainChecker from "./pages/DomainChecker";
import Templates from "./pages/Templates";
import Addons from "./pages/Addons";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Tutorial from "./pages/Tutorial";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Wizard from "./pages/Wizard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OrderProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/domain" element={<DomainChecker />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/wizard" element={<Wizard />} />
                <Route path="/addons" element={<Addons />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thankyou" element={<ThankYou />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </OrderProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
