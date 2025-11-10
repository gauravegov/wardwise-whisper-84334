import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MicOff, Calendar, MessageSquare, Users, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CreateTownhallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTownhallModal = ({ isOpen, onClose }: CreateTownhallModalProps) => {
  const [activeTab, setActiveTab] = useState<'topic' | 'meeting' | 'both'>('topic');
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    meetingDate: '',
    meetingTime: '',
    location: '',
    type: 'virtual' as 'virtual' | 'inperson'
  });
  
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (transcription && formData.description === '') {
      setFormData(prev => ({ ...prev, description: transcription }));
    }
  }, [transcription, formData.description]);

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
        // In a real implementation, you'd send the audio to a speech-to-text service
        // For now, we'll simulate transcription
        setTranscription("This is a simulated transcription. In production, this would be the actual speech-to-text result from your audio recording.");
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

  const handleSubmit = () => {
    // This would integrate with Supabase to store the data
    toast({
      title: "Success!",
      description: `${activeTab === 'topic' ? 'Topic' : activeTab === 'meeting' ? 'Meeting' : 'Topic & Meeting'} created successfully.`,
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      meetingDate: '',
      meetingTime: '',
      location: '',
      type: 'virtual'
    });
    setTranscription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Create New
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="topic" className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              Topic
            </TabsTrigger>
            <TabsTrigger value="meeting" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Meeting
            </TabsTrigger>
            <TabsTrigger value="both" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              Both
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-4">
            {/* Common Fields */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter topic/meeting title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the topic or meeting agenda"
                value={formData.description || transcription}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[100px]"
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

            {/* Meeting-specific fields */}
            {(activeTab === 'meeting' || activeTab === 'both') && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Meeting Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.meetingDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, meetingDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Meeting Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.meetingTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, meetingTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Meeting Type</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={formData.type === 'virtual' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'virtual' }))}
                    >
                      Virtual
                    </Button>
                    <Button
                      type="button"
                      variant={formData.type === 'inperson' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'inperson' }))}
                    >
                      In-Person
                    </Button>
                  </div>
                </div>

                {formData.type === 'inperson' && (
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter meeting location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                )}
              </>
            )}

            {/* Preview */}
            <Card className="bg-accent/30">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Preview</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Title:</strong> {formData.title || 'Enter title'}</p>
                  <p><strong>Description:</strong> {formData.description || transcription || 'Enter description'}</p>
                  {(activeTab === 'meeting' || activeTab === 'both') && (
                    <>
                      {formData.meetingDate && (
                        <p className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formData.meetingDate} at {formData.meetingTime || '--:--'}
                        </p>
                      )}
                      {formData.type === 'inperson' && formData.location && (
                        <p className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {formData.location}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Note about Supabase */}
            <Card className="bg-warning/10 border-warning/20">
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> To save and store your topics/meetings, connect this project to Supabase using the green button in the top-right corner.
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
                disabled={!formData.title || (!formData.description && !transcription)}
              >
                Create {activeTab === 'both' ? 'Topic & Meeting' : activeTab === 'topic' ? 'Topic' : 'Meeting'}
              </Button>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};