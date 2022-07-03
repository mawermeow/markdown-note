/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig =(phase)=> {
  if(phase === PHASE_DEVELOPMENT_SERVER){
    return {
      reactStrictMode: true,
      env: {
        mongodb_username:'dev',
        mongodb_password:'2oGDbtGnl9vLpQYk',
        mongodb_clustername:'cluster0',
        mongodb_database:'BulletNote-dev'
      }
    }
  }
  return {
    reactStrictMode: true,
    env: {
      mongodb_clustername:'cluster0',
      mongodb_database:'BulletNote'
    }
  }
}

module.exports = nextConfig