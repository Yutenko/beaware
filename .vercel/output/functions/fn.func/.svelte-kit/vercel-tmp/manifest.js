export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","casestudies/5c4c8252-c1e3-4e18-9028-78de3b9ef7c8.json","casestudies/dcc00729-c6e3-42bd-8c42-c3e7fca0cff2.json","environment/README.md","environment/phishing.config.json","favicon.png","fontawesome/.DS_Store","fontawesome/attribution.js","fontawesome/css/.DS_Store","fontawesome/css/all.min.css","fontawesome/webfonts/fa-brands-400.eot","fontawesome/webfonts/fa-brands-400.svg","fontawesome/webfonts/fa-brands-400.ttf","fontawesome/webfonts/fa-brands-400.woff","fontawesome/webfonts/fa-brands-400.woff2","fontawesome/webfonts/fa-duotone-900.eot","fontawesome/webfonts/fa-duotone-900.svg","fontawesome/webfonts/fa-duotone-900.ttf","fontawesome/webfonts/fa-duotone-900.woff","fontawesome/webfonts/fa-duotone-900.woff2","fontawesome/webfonts/fa-light-300.eot","fontawesome/webfonts/fa-light-300.svg","fontawesome/webfonts/fa-light-300.ttf","fontawesome/webfonts/fa-light-300.woff","fontawesome/webfonts/fa-light-300.woff2","fontawesome/webfonts/fa-regular-400.eot","fontawesome/webfonts/fa-regular-400.svg","fontawesome/webfonts/fa-regular-400.ttf","fontawesome/webfonts/fa-regular-400.woff","fontawesome/webfonts/fa-regular-400.woff2","fontawesome/webfonts/fa-solid-900.eot","fontawesome/webfonts/fa-solid-900.svg","fontawesome/webfonts/fa-solid-900.ttf","fontawesome/webfonts/fa-solid-900.woff","fontawesome/webfonts/fa-solid-900.woff2","media/certificate.png","media/delete-sound.mp3","media/edge.webp","media/homescreen.jpeg","media/learningenvironment/appicons/default.svg","media/learningenvironment/appicons/gmail.svg","media/learningenvironment/appicons/lunit.svg","media/learningenvironment/appicons/mail.svg","media/learningenvironment/appicons/main.svg","media/learningenvironment/appicons/office.svg","media/learningenvironment/appicons/phedge.svg","media/learningenvironment/appicons/phirephox.svg","media/learningenvironment/appicons/phrome.svg","media/learningenvironment/appicons/quiz.svg","media/learningenvironment/appicons/saphari.svg","media/learningenvironment/appicons/stats.svg","media/learningenvironment/backgrounds/Background_01_BeAware.svg","media/learningenvironment/backgrounds/Background_02_BeAware.svg","media/learningenvironment/backgrounds/Background_03_BeAware.svg","media/learningenvironment/backgrounds/learningunit_bg.png","media/pop-sound.mp3","media/simulation/p/google/favicon.ico","media/simulation/p/ms/365background.svg","media/simulation/p/ms/arrow-left.svg","media/simulation/p/ms/favicon.ico","media/simulation/p/ms/logo.svg","media/simulation/p/phbanner.png","media/simulation/p/phlogo.png","quizzes/1/f3ea52c0-f382-471d-9ec5-f8eb50d0261d.json","uploads/19a7ef25-4c92-47df-93a4-00c893c1cf21.png","uploads/4303b6e9-5359-48cc-8e94-cad0dee61b37.png"]),
	mimeTypes: {".json":"application/json",".md":"text/markdown",".png":"image/png",".js":"text/javascript",".css":"text/css",".svg":"image/svg+xml",".ttf":"font/ttf",".woff":"font/woff",".woff2":"font/woff2",".mp3":"audio/mpeg",".webp":"image/webp",".jpeg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.jaCSqbJI.js","app":"_app/immutable/entry/app.HRFPsNGl.js","imports":["_app/immutable/entry/start.jaCSqbJI.js","_app/immutable/chunks/entry.tU5bMAfH.js","_app/immutable/chunks/scheduler.cOHHkP0m.js","_app/immutable/chunks/index.MoR2mFp7.js","_app/immutable/entry/app.HRFPsNGl.js","_app/immutable/chunks/preload-helper.0HuHagjb.js","_app/immutable/chunks/scheduler.cOHHkP0m.js","_app/immutable/chunks/index.44LrZ0tY.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js')),
			__memo(() => import('../output/server/nodes/11.js')),
			__memo(() => import('../output/server/nodes/12.js')),
			__memo(() => import('../output/server/nodes/13.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/[slug]",
				pattern: /^\/api\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/_slug_/_server.js'))
			},
			{
				id: "/author",
				pattern: /^\/author\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/casestudy/[...id]/edit",
				pattern: /^\/casestudy(?:\/(.*))?\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/casestudy/[...id]",
				pattern: /^\/casestudy(?:\/(.*))?\/?$/,
				params: [{"name":"id","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/p/google",
				pattern: /^\/p\/google\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/p/microsoft",
				pattern: /^\/p\/microsoft\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/quiz/[type]/embed",
				pattern: /^\/quiz\/([^/]+?)\/embed\/?$/,
				params: [{"name":"type","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/quiz/[type]/setup",
				pattern: /^\/quiz\/([^/]+?)\/setup\/?$/,
				params: [{"name":"type","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/quiz/[type]/view",
				pattern: /^\/quiz\/([^/]+?)\/view\/?$/,
				params: [{"name":"type","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/user",
				pattern: /^\/user\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/user/apps/[type]/embed",
				pattern: /^\/user\/apps\/([^/]+?)\/embed\/?$/,
				params: [{"name":"type","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
