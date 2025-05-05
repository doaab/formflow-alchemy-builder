
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, PauseCircle, FileEdit } from "lucide-react";
import { useUpdateFormStatus } from "@/api/hooks/useFormQueries";
import { useToast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface FormStatusControlProps {
  formId: number;
  initialStatus?: string;
}

const FormStatusControl = ({ formId, initialStatus }: FormStatusControlProps) => {
  const [currentStatus, setCurrentStatus] = useState<string>(initialStatus || 'draft');
  const updateStatusMutation = useUpdateFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    if (initialStatus) {
      setCurrentStatus(initialStatus);
    }
  }, [initialStatus]);

  const handleStatusChange = async (status: string) => {
    try {
      const result = await updateStatusMutation.mutateAsync({
        formId,
        status,
      });
      
      setCurrentStatus(result.status);
      
      toast({
        title: "Status Updated",
        description: `Form status changed to ${result.status_label}`,
      });
    } catch (error) {
      console.error("Error updating form status:", error);
      toast({
        title: "Error",
        description: "Failed to update form status",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = () => {
    switch (currentStatus) {
      case 'published':
        return <Play className="h-4 w-4 text-green-600" />;
      case 'paused':
        return <PauseCircle className="h-4 w-4 text-amber-500" />;
      default:
        return <FileEdit className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (currentStatus) {
      case 'published':
        return "Published";
      case 'paused':
        return "Paused";
      default:
        return "Draft";
    }
  };

  const getStatusColor = () => {
    switch (currentStatus) {
      case 'published':
        return "text-green-600";
      case 'paused':
        return "text-amber-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center space-x-2" 
          disabled={updateStatusMutation.isPending}
        >
          {updateStatusMutation.isPending ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </span>
          ) : (
            <>
              {getStatusIcon()}
              <span className={`ml-2 ${getStatusColor()}`}>Status: {getStatusText()}</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4">
        <h3 className="font-medium mb-3">Change Form Status</h3>
        <RadioGroup 
          value={currentStatus} 
          onValueChange={handleStatusChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted">
            <RadioGroupItem value="draft" id="status-draft" />
            <Label htmlFor="status-draft" className="flex items-center cursor-pointer">
              <FileEdit className="h-4 w-4 mr-2 text-gray-500" />
              <span>Draft</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted">
            <RadioGroupItem value="published" id="status-published" />
            <Label htmlFor="status-published" className="flex items-center cursor-pointer">
              <Play className="h-4 w-4 mr-2 text-green-600" />
              <span>Published</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted">
            <RadioGroupItem value="paused" id="status-paused" />
            <Label htmlFor="status-paused" className="flex items-center cursor-pointer">
              <PauseCircle className="h-4 w-4 mr-2 text-amber-500" />
              <span>Paused</span>
            </Label>
          </div>
        </RadioGroup>
        <div className="mt-4 text-xs text-muted-foreground">
          {currentStatus === 'draft' && "Draft forms are only visible to you."}
          {currentStatus === 'published' && "Published forms are available to the public."}
          {currentStatus === 'paused' && "Paused forms show a message indicating submissions are temporarily disabled."}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FormStatusControl;
