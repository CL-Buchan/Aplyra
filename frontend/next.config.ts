import { withPostHogConfig } from '@posthog/nextjs-config';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'qvwisunaagdyimotnnlj.supabase.co',
                pathname: '/storage/v1/object/public/**'
            }
        ]
    }
};

// Source map upload needs a PostHog *personal* API key (starts with "phx_").
// Only enable it when one is actually present so local/preview builds don't fail.
const personalApiKey = process.env.POSTHOG_API_KEY ?? '';
const canUploadSourcemaps = personalApiKey.startsWith('phx_');

export default withPostHogConfig(nextConfig, {
    personalApiKey,
    projectId: process.env.POSTHOG_PROJECT_ID,
    host: process.env.POSTHOG_HOST,
    sourcemaps: {
        enabled: canUploadSourcemaps,
        deleteAfterUpload: true
    }
});
