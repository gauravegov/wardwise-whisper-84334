import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Mic, MicOff, Upload, MapPin, Camera, Navigation, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface SubmitProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitProposalModal = ({ isOpen, onClose }: SubmitProposalModalProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    customLocation: '',
    image: null as File | null
  });
  
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['Safety', 'Infrastructure', 'Environment', 'Water', 'Transport', 'Health', 'Education'];

  useEffect(() => {
    if (transcription && formData.description === '') {
      setFormData(prev => ({ ...prev, description: transcription }));
    }
  }, [transcription, formData.description]);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          // In a real app, you'd reverse geocode this to get the address
          setLocationName(`Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`);
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // Simulate transcription - in production, integrate with speech-to-text service
        setTranscription("This is a simulated transcription of your proposal description. The actual implementation would convert your speech to text using a service like Google Speech-to-Text or similar.");
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Microphone Access Required",
        description: "Please allow microphone access to use voice input.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = () => {
    // This would integrate with Supabase to store the proposal
    toast({
      title: "Proposal Submitted!",
      description: "Your proposal has been submitted for community review.",
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      customLocation: '',
      image: null
    });
    setTranscription('');
    setIsAnonymous(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Submit New Proposal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Proposal Title</Label>
            <Input
              id="title"
              placeholder="Enter a clear, descriptive title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your proposal in detail"
              value={formData.description || transcription}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[120px]"
            />
            
            {/* Voice Input */}
            <Card className="bg-accent/30">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Voice Input</span>
                    {isRecording && (
                      <Badge variant="destructive" className="animate-pulse">
                        Recording...
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant={isRecording ? "destructive" : "outline"}
                    onClick={isRecording ? stopRecording : startRecording}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-3 h-3 mr-1" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Mic className="w-3 h-3 mr-1" />
                        Record
                      </>
                    )}
                  </Button>
                </div>
                {transcription && (
                  <div className="mt-2 p-2 bg-background rounded text-xs">
                    <p className="font-medium mb-1">Transcription:</p>
                    <p className="text-muted-foreground">{transcription}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            
            {/* Current Location */}
            {userLocation && (
              <Card className="bg-success/10 border-success/20">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">Current Location Detected</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{locationName}</p>
                  
                  {/* Location Map */}
                  <div className="mt-2 h-32 relative rounded border-2 border-primary/20 overflow-hidden">
                    <img 
                      src="/lovable-uploads/6b130242-0e10-4c77-bd78-b29a2f49ffb1.png" 
                      alt="Area map"
                      className="w-full h-full object-cover"
                    />
                    {/* You are here marker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-lg">
                          You are here
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Custom Location */}
            <div className="space-y-2">
              <Label htmlFor="customLocation">Or specify a different location</Label>
              <Input
                id="customLocation"
                placeholder="Enter specific address or location"
                value={formData.customLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, customLocation: e.target.value }))}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Supporting Image (Optional)</Label>
            <Card 
              className="border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <CardContent className="p-6 text-center">
                {formData.image ? (
                  <div className="space-y-2">
                    <Camera className="w-8 h-8 text-success mx-auto" />
                    <p className="text-sm font-medium text-success">{formData.image.name}</p>
                    <p className="text-xs text-muted-foreground">Click to change</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-sm font-medium">Upload Image</p>
                    <p className="text-xs text-muted-foreground">Click to select an image file</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Anonymous Toggle */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="anonymous-mode" className="text-base font-medium cursor-pointer">
                      Submit Anonymously
                    </Label>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <p>
                      When enabled, your name will not be displayed with this proposal. 
                      It will show as "Anonymous Citizen" instead of your name, protecting your identity 
                      while still allowing you to participate in civic engagement.
                    </p>
                  </div>
                </div>
                <Switch
                  id="anonymous-mode"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="bg-accent/30">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Proposal Preview</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Title:</strong> {formData.title || 'Enter title'}</p>
                <p><strong>Category:</strong> {formData.category || 'Select category'}</p>
                <p><strong>Description:</strong> {formData.description || transcription || 'Enter description'}</p>
                <p><strong>Location:</strong> {formData.customLocation || locationName || 'Location not specified'}</p>
                <p><strong>Submitted by:</strong> {isAnonymous ? 'Anonymous Citizen' : 'Your Name'}</p>
                {formData.image && (
                  <p className="flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    Image attached: {formData.image.name}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Note about Supabase */}
          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> To save and store your proposals, connect this project to Supabase using the green button in the top-right corner.
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!formData.title || (!formData.description && !transcription) || !formData.category}
            >
              Submit Proposal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};