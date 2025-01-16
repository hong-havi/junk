'use client';

import { useState, useRef, useCallback } from 'react';
import { uploadFile } from './actions/fileupload.action';
import { FILE_TYPES } from './constants/file-type.constant';
import type { FileTypeKey } from './constants/file-type.constant';
import type { FileValidationResult } from './types/file.type';

export interface UseFileUploadProps {
    allowedTypes: FileTypeKey[];
    onUploadComplete?: (response: any) => void;
    onError?: (error: Error) => void;
    onFileSelect?: (file: File) => void;
}

export interface UseFileUploadReturn {
    isDragging: boolean;
    isUploading: boolean;
    error: string;
    fileInputRef: React.RefObject<HTMLInputElement>;
    acceptString: string;
    handleDragOver: (e: React.DragEvent) => void;
    handleDragLeave: (e: React.DragEvent) => void;
    handleDrop: (e: React.DragEvent) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClick: () => void;
    getAllowedTypesDescription: () => string;
}

export const useFileUpload = ({
    allowedTypes,
    onUploadComplete,
    onError,
    onFileSelect
}: UseFileUploadProps): UseFileUploadReturn => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 허용된 파일 타입 설정
    const allowedTypeConfigs = allowedTypes.map(type => FILE_TYPES[type]);
    const acceptString = allowedTypeConfigs
        .flatMap(config => config.mimeTypes)
        .join(',');

    // 파일 유효성 검사
    const validateFile = useCallback((file: File): FileValidationResult => {
        const matchingType = allowedTypeConfigs.find(config =>
            config.mimeTypes.includes(file.type)
        );

        if (!matchingType) {
            const allowedExtensions = allowedTypeConfigs
                .flatMap(config => config.extensions)
                .join(', ');
            return {
                isValid: false,
                error: `지원하지 않는 파일 형식입니다. 허용된 확장자: ${allowedExtensions}`
            };
        }

        if (file.size > matchingType.maxSize) {
            return {
                isValid: false,
                error: `파일 크기가 너무 큽니다. ${matchingType.description}의 최대 크기는 ${matchingType.maxSize / 1024 / 1024}MB입니다.`
            };
        }

        return { isValid: true };
    }, [allowedTypeConfigs]);

    // 파일 업로드 처리
    const handleUpload = useCallback(async (file: File) => {
        const validation = validateFile(file);
        
        if (!validation.isValid) {
            setError(validation.error || '파일 검증 실패');
            onError?.(new Error(validation.error));
            return;
        }

        setIsUploading(true);
        setError('');
        onFileSelect?.(file);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // 서버 액션 호출
            const result = await uploadFile(formData);

            if (!result.success) {
                throw new Error(result.error);
            }

            onUploadComplete?.(result.data);
        } catch (err) {
            const errorMsg = '파일 업로드 중 오류가 발생했습니다.';
            setError(errorMsg);
            onError?.(err instanceof Error ? err : new Error(errorMsg));
        } finally {
            setIsUploading(false);
        }
    }, [validateFile, onUploadComplete, onError, onFileSelect]);

    // 이벤트 핸들러들
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleUpload(file);
        }
    }, [handleUpload]);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleUpload(file);
        }
    }, [handleUpload]);

    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const getAllowedTypesDescription = useCallback(() => {
        return allowedTypeConfigs
            .map(config => `${config.description} (최대 ${config.maxSize / 1024 / 1024}MB)`)
            .join(', ');
    }, [allowedTypeConfigs]);

    return {
        isDragging,
        isUploading,
        error,
        fileInputRef,
        acceptString,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFileChange,
        handleClick,
        getAllowedTypesDescription
    };
};