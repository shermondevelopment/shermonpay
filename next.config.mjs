/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
	return [
		{
		  source: '/:path*',
		  headers: [
			{
			  key: 'Referrer-Policy',
			  value: 'no-referrer-when-downgrade'
			},
			{
			  key: 'X-DNS-Prefetch-Control',
			  value: 'on'
			},
			{
			  key: 'X-Frame-Options',
			  value: 'DENY'
			},
			{ key: 'Access-Control-Allow-Credentials', value: 'true' },
			{ key: 'Access-Control-Allow-Origin', value: '*' },
			{
			  key: 'Access-Control-Allow-Methods',
			  value: 'GET,DELETE,PATCH,POST,PUT'
			},
			{
			  key: 'Access-Control-Allow-Headers',
			  value:
				'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
			}
		  ]
		}
	  ];
  }
};

export default nextConfig;
