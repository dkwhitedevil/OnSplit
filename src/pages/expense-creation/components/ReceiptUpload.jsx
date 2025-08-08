import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReceiptUpload = ({ receipts, onReceiptsChange, onAIScan }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files?.filter(file => file?.type?.startsWith('image/'));
    
    imageFiles?.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newReceipt = {
          id: Date.now() + Math.random(),
          file,
          preview: e?.target?.result,
          name: file?.name,
          size: file?.size,
          uploadedAt: new Date()
        };
        onReceiptsChange([...receipts, newReceipt]);
      };
      reader?.readAsDataURL(file);
    });
  };

  const removeReceipt = (receiptId) => {
    const updatedReceipts = receipts?.filter(receipt => receipt?.id !== receiptId);
    onReceiptsChange(updatedReceipts);
  };

  const handleAIScan = async (receipt) => {
    setIsScanning(true);
    
    // Simulate AI scanning process
    setTimeout(() => {
      const mockScanResults = {
        title: "Dinner at Mario\'s Italian Restaurant",
        totalAmount: "127.50",
        category: "food",
        date: "2025-01-08",
        items: [
          { name: "Margherita Pizza", amount: "18.50" },
          { name: "Caesar Salad", amount: "12.00" },
          { name: "Spaghetti Carbonara", amount: "22.00" },
          { name: "Tiramisu", amount: "8.50" },
          { name: "Wine Bottle", amount: "45.00" },
          { name: "Tax", amount: "12.75" },
          { name: "Tip", amount: "8.75" }
        ],
        confidence: 0.94
      };
      
      setScanResults(mockScanResults);
      setIsScanning(false);
      onAIScan(mockScanResults);
    }, 2000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Icon name="Upload" size={20} color="#0E0F1C" />
        </div>
        <div>
          <h2 className="text-xl font-space-grotesk font-bold text-foreground">
            Receipt Upload
          </h2>
          <p className="text-sm text-text-secondary">
            Upload receipts for AI-powered expense scanning
          </p>
        </div>
      </div>
      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50 hover:bg-surface/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-4">
          <div className={`w-16 h-16 mx-auto rounded-full bg-surface flex items-center justify-center transition-all duration-300 ${
            isDragOver ? 'bg-primary/10 scale-110' : ''
          }`}>
            <Icon 
              name={isDragOver ? "Download" : "ImagePlus"} 
              size={32} 
              className={`transition-colors duration-300 ${
                isDragOver ? 'text-primary' : 'text-text-secondary'
              }`}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              {isDragOver ? 'Drop your receipts here' : 'Upload Receipt Images'}
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Drag and drop images or click to browse
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef?.current?.click()}
              iconName="Upload"
              iconPosition="left"
              className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            >
              Choose Files
            </Button>
          </div>
        </div>

        {/* Animated particles for drag state */}
        {isDragOver && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-ping"></div>
            <div className="absolute top-8 right-6 w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-primary rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          </div>
        )}
      </div>
      {/* Uploaded Receipts */}
      {receipts?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Uploaded Receipts ({receipts?.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {receipts?.map((receipt) => (
              <div
                key={receipt?.id}
                className="bg-surface rounded-lg border border-border p-4 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-3">
                  {/* Receipt Preview */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={receipt?.preview}
                      alt={receipt?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Receipt Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {receipt?.name}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {formatFileSize(receipt?.size)}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {receipt?.uploadedAt?.toLocaleTimeString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleAIScan(receipt)}
                      loading={isScanning}
                      iconName="Scan"
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      AI Scan
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => removeReceipt(receipt?.id)}
                      iconName="X"
                      className="text-text-secondary hover:text-destructive hover:bg-destructive/10"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* AI Scan Results */}
      {scanResults && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={20} className="text-success" />
            <h3 className="text-lg font-medium text-foreground">
              AI Scan Results
            </h3>
            <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
              {Math.round(scanResults?.confidence * 100)}% confidence
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Title:</span>
              <p className="text-foreground font-medium">{scanResults?.title}</p>
            </div>
            <div>
              <span className="text-text-secondary">Amount:</span>
              <p className="text-foreground font-medium">${scanResults?.totalAmount}</p>
            </div>
            <div>
              <span className="text-text-secondary">Category:</span>
              <p className="text-foreground font-medium capitalize">{scanResults?.category}</p>
            </div>
            <div>
              <span className="text-text-secondary">Date:</span>
              <p className="text-foreground font-medium">{scanResults?.date}</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            iconName="Check"
            iconPosition="left"
            className="border-success/30 text-success hover:bg-success/10"
          >
            Apply Scan Results
          </Button>
        </div>
      )}
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 pt-2">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-muted rounded-full"></div>
        <div className="w-2 h-2 bg-muted rounded-full"></div>
      </div>
    </div>
  );
};

export default ReceiptUpload;