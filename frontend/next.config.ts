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

export default withPostHogConfig(nextConfig, {
    personalApiKey: process.env.POSTHOG_API_KEY,
    projectId: process.env.POSTHOG_PROJECT_ID,
    host: process.env.POSTHOG_HOST,
    sourcemaps: {
        enabled: true,
        deleteAfterUpload: true
    }
});
