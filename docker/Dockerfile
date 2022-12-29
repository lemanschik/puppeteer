FROM node:latest

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    # Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -r chromium && useradd -rm -g pptruser -G audio,video pptruser

USER pptruser

WORKDIR /home/chromium

RUN npm i -D cosmiconfig https://github.com/puppeteer/puppeteer && npm i -D node_modules/puppeteer-repo/packages/puppeteer \
    && (node -e "child_process.execSync(`${require('puppeteer').executablePath()} --credits`, {stdio: 'inherit'})" > THIRD_PARTY_NOTICES)

CMD ["google-chrome-stable"]
