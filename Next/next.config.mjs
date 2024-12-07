/** @type {import('next').NextConfig} */
const nextConfig = {
    // excluse wasm files from being processed by webpack
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.module.rules.push({
                test: /\.wasm$/,
                type: 'javascript/auto',
                loader: 'file-loader',
            });
        }

        return config;
    },
};

export default nextConfig;
