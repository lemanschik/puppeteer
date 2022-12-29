FROM node:latest
RUN \ 
# node -e --input-type="module" "child_process.execSync(`\
curl -sS https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/google-linux_signing_key.gpg &>/dev/null \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update -y && apt-get install -y --no-install-recommends google-chrome-stable libxss1 \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf \
  && rm -rf /var/lib/apt/lists/* groupadd -r chromium && useradd -rm -g chromium -G audio,video chromium 
  # \
  # `, {stdio: 'inherit'})" 
## Above should be extra versioned image called node-chromium


USER chromium
WORKDIR /home/chromium

RUN mkdir -p node_modules && npm i -D cosmiconfig https://github.com/puppeteer/puppeteer \
    && npm i -D node_modules/puppeteer-repo/packages/puppeteer
    && (node -e --input-type="module" "child_process.execSync(`${await import('puppeteer').executablePath()} --credits`, {stdio: 'inherit'})" > THIRD_PARTY_NOTICES)

CMD ["google-chrome-stable"]
