//home-app/webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
// import ModuleFederationPlugin from webpack
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// import dependencies from package.json, which includes react and react-dom
const { dependencies } = require("./package.json");
const path = require("path");

module.exports = {
  entry: "./src/entry.js",
  mode: "development",
  devServer: {
    port: 3001, // port 3001 for header-app
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "src", "public"),
    },
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "proTwo", // This application named 'HeaderApp'
      filename: "remoteEntry.js", // output a js file
      exposes: {
        "./Demo": "./src/App.js",
      },
      remotes: {
        proOne: "proOne@http://localhost:3000/remoteEntry.js",
      },
      shared: {
        // and shared
        //   ...dependencies,  // some other dependencies
        react: {
          // react
          singleton: true,
          requiredVersion: dependencies["react"],
          eager: true,
        },
        "react-dom": {
          // react-dom
          singleton: true,
          requiredVersion: dependencies["react-dom"],
          eager: true,
        },
        "react-router-dom": {
          // react-router-dom
          singleton: true,
          requiredVersion: dependencies["react-router-dom"],
          eager: true,
        },
      },
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  target: "web",
};
