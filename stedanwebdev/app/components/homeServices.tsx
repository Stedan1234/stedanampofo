import { FaArrowRightLong } from "react-icons/fa6";
import ServicesGrid from "../components/ui/ServicesGrid";
import { motion } from "framer-motion";
import Link from "next/link";

const Services = () => {
  return (
    <motion.div className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex justify-between">
        <div className="inline-block my-6">
          <h2 className="text-2xl font-bold">Services</h2>
          <hr className="w-full border-t-2 border-[var(--span-color)] mt-1" />
        </div>

        <Link
          href="/services"
          className="flex items-center gap-1 text-sm md:text-base font-normal lg:text-lg text-text dark:text-[var(--text-color)] text-center px-4 py-2 hover:bg-text hover:text-[var(--span-color)] transition-all duration-300"
        >
          Explore My Process <FaArrowRightLong />
        </Link>
      </div>

      {/* Services Grid */}
      <ServicesGrid />
    </motion.div>
  );
};

export default Services;
