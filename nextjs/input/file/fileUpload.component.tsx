'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import { CloudUpload, Error } from '@mui/icons-material';
import type { FileTypeKey } from './constants/file-type.constant';
import { defaultStyles, darkStyles } from './styles/file.styles';
import { useFileUpload } from './useFileUpload.hook';
import { Theme } from '@mui/material/styles';
import { SystemStyleObject } from '@mui/system';

export interface FileUploadProps {
    allowedTypes: FileTypeKey[];
    darkMode?: boolean;
    onUploadComplete?: (response: any) => void;
    onError?: (error: Error) => void;
    onFileSelect?: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
    allowedTypes,
    darkMode = false,
    onUploadComplete,
    onError,
    onFileSelect
}) => {
    const styles = darkMode ? darkStyles : defaultStyles;

    const {
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
    } = useFileUpload({
        allowedTypes,
        onUploadComplete,
        onError,
        onFileSelect
    });

    const getDropzoneStyles = (): SystemStyleObject<Theme> => ({
        ...styles.dropzone.base,
        ...(isDragging ? styles.dropzone.dragging : {}),
        ...(isUploading ? styles.dropzone.uploading : {})
    });

    return (
        <Box sx={styles.container}>
            <Box
                sx={getDropzoneStyles()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptString}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <Box sx={styles.content}>
                    <Button
                        variant="outlined"
                        component="span"
                        onClick={handleClick}
                        startIcon={<CloudUpload />}
                        disabled={isUploading}
                        sx={styles.button}
                    >
                        {isUploading ? '업로드 중...' : '파일 선택'}
                    </Button>
                    <Box sx={styles.text.description}>
                        {getAllowedTypesDescription()}
                    </Box>
                    {error && (
                        <Box sx={styles.error.container}>
                            <Error sx={styles.error.icon} />
                            <Box sx={styles.error.text}>{error}</Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default FileUpload;