export class S3UploadEntity {
    url: string;
    fields: Record<string, string>

    constructor(partial: Partial<S3UploadEntity>) {
        Object.assign(this, partial);
    }
}
