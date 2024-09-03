import { config } from "process";

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: "loose",
        serverComponentsExternalPackages: ["mongoose"],
        instrumentationHook: true,
    },
};

export default nextConfig;
