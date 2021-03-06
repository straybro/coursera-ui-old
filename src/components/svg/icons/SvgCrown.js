const React = require('react');

const SvgCrown = ({name = 'SvgCrown', size = 44, fill = '#e6e9ed', htmlAttributes}) => {
  return (
		<svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={40}
      height={40}
      viewBox="0 0 159.431 159.431"
      fill={fill}
  {...htmlAttributes}
		>
			<title>Crown</title>
			<path d={`M157.812,46.964c-1.455-1.097-3.443-1.086-4.878,0.016l-41.966,32.033L83.417,16.785c-1.297-2.935-6.106-2.935-7.404,0
				L48.148,79.731L6.554,47.017c-1.437-1.129-3.451-1.16-4.915-0.074c-1.463,1.084-2.025,3.02-1.366,4.72l28.819,74.458v14.677
				c0,2.235,1.814,4.05,4.05,4.05h93.15c2.235,0,4.05-1.814,4.05-4.05v-14.677l28.819-74.458
				C159.811,49.973,159.257,48.056,157.812,46.964z M122.237,136.748h-85.05v-7.083h85.05V136.748z M123.703,120.816h-87.99
				L13.146,62.521L47.23,89.318c0.994,0.775,2.286,1.039,3.488,0.754c1.221-0.306,2.22-1.149,2.729-2.289l26.264-59.347l25.924,58.562
				c0.512,1.134,1.492,1.973,2.694,2.283c1.213,0.312,2.484,0.053,3.47-0.701l34.626-26.436L123.703,120.816z`} />
		</svg>
  );
};

module.exports = SvgCrown;
