import * as Bluebird from 'bluebird';
import { exec } from 'child_process';
import { platform } from 'os';
import { SupportedPlatforms } from './supported-platforms';

export class Connector {
    private curl = 'curl -s';
    private path;
    private version = 'v1.27';
    private base = '';

    constructor(options?: any) {
        this.setDefaultPath();
    }

    public get(target: string): Bluebird<any> {
        return this.execCurl(`${this.curl} ${this.path} http:/${this.version}${target}`);
    }

    public post(target: string, data: any): Bluebird<any> {
        return this.execCurl(
            /* tslint:disable-next-line */
            `${this.curl} ${this.path} -X POST http:/${this.version}${target} -H "Content-Type: application/json" -d '${JSON.stringify(data)}'`,
        );
    }

    private setDefaultPath() {
        switch (platform()) {
            case SupportedPlatforms.DARWIN: {
                this.path = '--unix-socket /var/run/docker.sock';
                return;
            }
            case SupportedPlatforms.LINUX: {
                this.path = '--unix-socket /var/run/docker.sock';
                return;
            }
            default: {
                throw new Error('Not supported platform: ()');
            }
        }
    }

    private execCurl(command: string): Bluebird<any> {
        /* tslint:disable-next-line */
        console.log(command);

        return new Bluebird((resolve, reject) => {
            exec(command, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (stderr) {
                    reject(stderr);
                    return;
                }
                resolve(JSON.parse(stdout));
            });
        });
    }
}
