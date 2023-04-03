/**
 * A puppeteer connection transport for extension.
 */
export class ExtensionDebuggerTransport {
    target;
    debugee;
    /**
     * If required, adjust this value to increase or decrese delay in ms between subsequent commands.
     * > Note :- decreasing it too much can give issues
     *
     * @default 0.04 * 1000
     */
    delay = 0.04 * 1000;
    _sessionId;
    /** @internal */
    onmessage;
    /** @internal */
    onclose;
    /**
     * Returns a puppeteer connection transport instance for extension.
     * @example
     * How to use it:
     * ```javascript
     * const extensionTransport = await ExtensionDebuggerTransport.create(tabId)
     * const browser = await puppeteer.connect({
     *  transport: extensionTransport,
     *  defaultViewport: null
     * })
     *
     * // use first page from pages instead of using browser.newPage()
     * const [page] = await browser.pages()
     * await page.goto('https://wikipedia.org')
     * ```
     *
     * @param tabId - The id of tab to target. You can get this using chrome.tabs api
     * @param functionSerializer - Optional function serializer. If not specified and
     * if extension's manifest.json contains `unsafe_eval` then defaults to `new Function()`
     * else defaults to `() => {}`
     * @returns - The instance of {@link ExtensionDebuggerTransport}
     *
     * @throws Error
     * If debugger permission not given to extension
     */
    static create(tabId, functionSerializer) {
        if (chrome.debugger) {
            const debugee = {
                tabId: tabId,
            };
            return new Promise((resolve, reject) => {
                chrome.debugger.attach(debugee, '1.3', async () => {
                    const error = chrome.runtime.lastError;
                    if (!error) {
                        const target = await this._getTargetInfo(debugee);
                        const transport = new ExtensionDebuggerTransport(target);
                        transport._initialize(functionSerializer);
                        resolve(transport);
                    }
                    else {
                        reject(error);
                    }
                });
            });
        }
        else {
            throw new Error('no debugger permission');
        }
    }
    constructor(target) {
        this.target = target;
        this._sessionId = target.id;
        this.debugee = {
            tabId: target.tabId,
        };
        chrome.debugger.onEvent.addListener((source, method, params) => {
            const event = {
                method: method,
                params: params,
                sessionId: this._sessionId,
            };
            source.tabId === this.target.tabId ? this._emit(event) : null;
        });
        chrome.debugger.onDetach.addListener(source => {
            source.tabId === this.target.tabId ? this._closeTarget() : null;
        });
    }
    /** @internal */
    send(message) {
        const command = JSON.parse(message);
        const targetCommands = [
            'Target.getBrowserContexts',
            'Target.setDiscoverTargets',
            'Target.attachToTarget',
            'Target.activateTarget',
            'Target.closeTarget',
        ];
        if (targetCommands.includes(command.method)) {
            this._handleTargetCommand(command);
        }
        else {
            chrome.debugger.sendCommand(this.debugee, command.method, command.params, result => this._handleCommandResponse(command, result));
        }
    }
    /** @internal */
    close() {
        chrome.debugger.detach(this.debugee, () => this._closeTarget());
    }
    static _getTargetInfo(debugee) {
        return new Promise((resolve, reject) => {
            chrome.debugger.getTargets(targets => {
                const target = targets
                    .filter(target => target.attached && target.tabId === debugee.tabId)
                    .map(target => {
                    return {
                        ...target,
                        targetId: target.id,
                        canAccessOpener: false,
                    };
                });
                target[0] ? resolve(target[0]) : reject(new Error('target not found'));
            });
        });
    }
    _initialize(functionSerializer) {
        if (functionSerializer) {
            Function = functionSerializer;
        }
        else {
            try {
                new Function();
            }
            catch (e) {
                Function = function () {
                    return () => { };
                };
            }
        }
    }
    _handleCommandResponse(command, result) {
        const error = chrome.runtime.lastError;
        const response = {
            ...command,
            error: error,
            result: result,
        };
        this._delaySend(response);
    }
    _handleTargetCommand(command) {
        const response = {
            ...command,
            error: undefined,
            result: {},
        };
        switch (command.method) {
            case 'Target.getBrowserContexts':
                response.result = {
                    browserContextIds: [],
                };
                break;
            case 'Target.setDiscoverTargets':
                response.result = null;
                this._emitTargetCreated();
                break;
            case 'Target.attachToTarget':
                response.result = {
                    sessionId: this._sessionId,
                };
                this._emitTargetAttached();
                break;
            case 'Target.activateTarget':
                response.result = null;
                break;
            case 'Target.closeTarget':
                response.result = {
                    success: true,
                };
                setTimeout(() => this.close(), this.delay);
                break;
        }
        this._delaySend(response);
    }
    _emitTargetCreated() {
        const event = {
            method: 'Target.targetCreated',
            params: {
                targetInfo: this.target,
            },
        };
        this._emit(event);
    }
    _emitTargetAttached() {
        const event = {
            method: 'Target.attachedToTarget',
            params: {
                targetInfo: this.target,
                sessionId: this._sessionId,
                waitingForDebugger: false,
            },
        };
        this._emit(event);
    }
    _emitTargetDetached() {
        const event = {
            method: 'Target.detachedFromTarget',
            params: {
                targetId: this.target.id,
                sessionId: this._sessionId,
            },
        };
        this._emit(event);
    }
    _closeTarget() {
        this._emitTargetDetached();
        this.onclose?.call(null);
    }
    _emit(event) {
        this?.onmessage?.call(null, JSON.stringify(event));
    }
    _delaySend(response) {
        setTimeout(() => {
            this?.onmessage?.call(null, JSON.stringify(response));
        }, this.delay);
    }
}

// import('puppeteer/connect-extension-tab.js').then(({ connect })=> connect(tabId)).then(browser......)
export async function connect(tabId) {
  const transport = await ExtensionDebuggerTransport.create(tabId);
  return await puppeteer.connect({transport, defaultViewport: null});
}
