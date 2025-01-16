'use server';

import { revalidatePath } from 'next/cache';
import { EnvHelper } from '@libraries/helpers/getEnv.helper'
import { api } from '@libraries/helpers/fetch-client.helper'

export async function uploadFile(formData: FormData) {
    try {
        const file = formData.get('file');
        if (!file) {
            throw new Error('No file provided');
        }

        const baseURL : string = EnvHelper.get('NEXUS_API_URI');
        const token : string = EnvHelper.get('NEXUS_API_TOKEN');

        // 외부 API로 파일 전송
        const response = await api.post(
            `${baseURL}/common/v1/file/upload/presigned`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,

                }
            }
        );

        console.log(response);

        
        // 필요한 경우 캐시 무효화
        revalidatePath('/');

        return {
            success: true,
            //data: result
        };
    } catch (error) {
        console.error('File upload error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Upload failed'
        };
    }
}

