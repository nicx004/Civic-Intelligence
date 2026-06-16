"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Clock3, FileCheck2, MapPin, ShieldCheck, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ComplaintFormValues = {
  category: string;
  ward: string;
  locality: string;
  landmark: string;
  phone: string;
  complaint: string;
  photo?: FileList;
};

export function ComplaintForm() {
  const [selectedPhotoName, setSelectedPhotoName] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [acknowledgementId, setAcknowledgementId] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ComplaintFormValues>({
    defaultValues: {
      category: "",
      ward: "",
      locality: "",
      landmark: "",
      phone: "",
      complaint: "",
    },
  });

  const { ref: photoRegisterRef, onChange: onPhotoChange, ...photoField } =
    register("photo");
  const {
    onChange: onCategoryChange,
    ...categoryField
  } = register("category", {
    required: "Select a complaint category.",
  });

  async function onSubmit(values: ComplaintFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const acknowledgement = `CI-${Math.floor(100000 + Math.random() * 900000)}`;

    console.log("Mock complaint submission", {
      category: values.category,
      ward: values.ward,
      locality: values.locality,
      landmark: values.landmark,
      phone: values.phone,
      complaint: values.complaint,
      photoName: values.photo?.[0]?.name ?? null,
      acknowledgement,
    });

    reset();
    setSelectedPhotoName("");
    setAcknowledgementId(acknowledgement);
    setHasSubmitted(true);
  }

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader className="space-y-3 portal-card-header">
        <div className="status-row">
          <span className="status-pill status-pill--primary">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Official submission
          </span>
          <span className="status-pill">
            <Clock3 className="h-4 w-4" aria-hidden="true" />
            Takes about 2 minutes
          </span>
        </div>
        <div className="space-y-2">
          <CardTitle>Register a civic complaint</CardTitle>
          <CardDescription>
            Provide the location and category first so the issue can be routed
            to the correct municipal department.
          </CardDescription>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-8">
          <section className="form-section">
            <div className="section-heading">
              <h3>Location and category</h3>
              <p>
                This helps the complaint reach the right ward office and field
                team.
              </p>
            </div>

            <div className="form-grid form-grid--two">
              <div className="space-y-2">
                <Label htmlFor="category">Complaint category</Label>
                <select
                  id="category"
                  className="input select"
                  aria-invalid={errors.category ? "true" : "false"}
                  {...categoryField}
                  onChange={(event) => {
                    onCategoryChange(event);
                    setHasSubmitted(false);
                  }}
                >
                  <option value="">Select issue type</option>
                  <option value="roads">Roads and potholes</option>
                  <option value="sanitation">Sanitation and waste</option>
                  <option value="streetlights">Streetlights</option>
                  <option value="water">Water supply</option>
                  <option value="drainage">Drainage and flooding</option>
                  <option value="public-safety">Public safety</option>
                  <option value="other">Other civic issue</option>
                </select>
                {errors.category ? (
                  <p className="text-sm text-destructive">
                    {errors.category.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ward">Ward number / zone</Label>
                <Input
                  id="ward"
                  placeholder="Example: Ward 84 or Zone 3"
                  aria-invalid={errors.ward ? "true" : "false"}
                  onInput={() => setHasSubmitted(false)}
                  {...register("ward", {
                    required: "Enter the ward or zone.",
                    minLength: {
                      value: 2,
                      message: "Please add a ward or zone reference.",
                    },
                  })}
                />
                {errors.ward ? (
                  <p className="text-sm text-destructive">
                    {errors.ward.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="locality">Locality / area</Label>
                <Input
                  id="locality"
                  placeholder="Example: Sector 33A, Chandigarh"
                  aria-invalid={errors.locality ? "true" : "false"}
                  onInput={() => setHasSubmitted(false)}
                  {...register("locality", {
                    required: "Enter the locality or area.",
                  })}
                />
                {errors.locality ? (
                  <p className="text-sm text-destructive">
                    {errors.locality.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="landmark">Nearby landmark</Label>
                <Input
                  id="landmark"
                  placeholder="Example: Near metro station or school"
                  aria-invalid={errors.landmark ? "true" : "false"}
                  onInput={() => setHasSubmitted(false)}
                  {...register("landmark", {
                    required: "Enter a nearby landmark.",
                  })}
                />
                {errors.landmark ? (
                  <p className="text-sm text-destructive">
                    {errors.landmark.message}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="section-heading">
              <h3>Complaint details</h3>
              <p>
                Describe what happened and what the site team should see when
                they arrive.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="complaint">Complaint description</Label>
              <Textarea
                id="complaint"
                placeholder="Example: Road flooded near Whitefield Metro Station and streetlights are not working."
                className="min-h-56 resize-y"
                aria-invalid={errors.complaint ? "true" : "false"}
                onInput={() => setHasSubmitted(false)}
                {...register("complaint", {
                  required: "Please describe the complaint.",
                  minLength: {
                    value: 20,
                    message: "Please add a little more detail.",
                  },
                })}
              />
              {errors.complaint ? (
                <p className="text-sm text-destructive">
                  {errors.complaint.message}
                </p>
              ) : null}
            </div>
          </section>

          <section className="form-section">
            <div className="section-heading">
              <h3>Optional contact and evidence</h3>
              <p>
                Add a phone number for updates and attach a photo if one is
                available.
              </p>
            </div>

            <div className="form-grid form-grid--two">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile number</Label>
                <Input
                  id="phone"
                  inputMode="tel"
                  placeholder="Example: 98XXXXXXXX"
                  aria-invalid={errors.phone ? "true" : "false"}
                  onInput={() => setHasSubmitted(false)}
                  {...register("phone", {
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Enter a valid 10-digit mobile number.",
                    },
                  })}
                />
                {errors.phone ? (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                ) : (
                  <p className="field-hint">Optional. For complaint updates only.</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="photo">Photo evidence</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...photoField}
                  ref={(element) => {
                    photoRegisterRef(element);
                    fileInputRef.current = element;
                  }}
                  onChange={(event) => {
                    onPhotoChange(event);
                    setSelectedPhotoName(event.target.files?.[0]?.name ?? "");
                    setHasSubmitted(false);
                  }}
                />
                <div className="upload-panel">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
                    Upload photo
                  </Button>
                  <p className="field-hint">
                    {selectedPhotoName || "Optional JPG, PNG, or mobile photo."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="info-strip">
            <div>
              <FileCheck2 className="h-4 w-4" aria-hidden="true" />
              <span>Submission is stored locally in this prototype.</span>
            </div>
            <div>
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>Department routing will use ward and category data.</span>
            </div>
          </div>

          {hasSubmitted ? (
            <div className="submission-confirmation" role="status">
              <strong>Complaint submitted successfully.</strong>
              <p>
                Reference number: <span>{acknowledgementId}</span>
              </p>
              <p>
                This is a front-end prototype. Backend submission and state sync
                are not connected yet.
              </p>
            </div>
          ) : null}
        </CardContent>

        <CardFooter className="card-footer--enhanced">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit complaint"}
          </Button>
          <p className="field-hint card-footer__note">
            By submitting, you confirm the information is accurate to the best
            of your knowledge.
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

export default ComplaintForm;
