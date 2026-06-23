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
// Backend integration: use the shared Prisma-enum-backed category options.
import { CATEGORIES } from "@/constants/categories";

type ReportCategoryValue = (typeof CATEGORIES)[number]["value"];

// Backend integration: the API returns the created report; its real ID is used
// by the existing success screen as the complaint reference number.
type CreatedReport = {
  id: string;
};

type ComplaintFormValues = {
  category: ReportCategoryValue;
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
  // Backend integration: retain the returned report instead of creating a fake ID.
  const [createdReport, setCreatedReport] = useState<CreatedReport | null>(null);
  const [submissionError, setSubmissionError] = useState<string>("");
  const [isLocatingWard, setIsLocatingWard] = useState(false);
  const [capturedCoordinates, setCapturedCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ComplaintFormValues>({
    defaultValues: {
      // The empty value keeps the existing dropdown placeholder and validation UX.
      category: "" as ReportCategoryValue,
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
    setSubmissionError("");

    // Backend integration: coordinates are required by POST /api/reports.
    if (!capturedCoordinates) {
      setLocationStatus("Detect the complaint location before submitting.");
      return;
    }

    try {
      // Backend integration: replace the prototype delay/logging with the real API call.
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: values.complaint.substring(0, 80),
        description: values.complaint,

        category: values.category,

        ward: values.ward,
        locality: values.locality,
        landmark: values.landmark,
        phone: values.phone || null,

        latitude: capturedCoordinates.latitude,
        longitude: capturedCoordinates.longitude,
        }),
      });

      if (!response.ok) {
        throw new Error("The complaint could not be submitted.");
      }

      // Backend integration: keep the report returned by the backend.
      const report = (await response.json()) as CreatedReport;

      reset();
      setSelectedPhotoName("");
      setCreatedReport(report);
      setHasSubmitted(true);
    } catch {
      // Backend integration: preserve entered form values when submission fails.
      setSubmissionError("Unable to submit the complaint. Please try again.");
    }
  }

  function handleWardLocationLookup() {
    setHasSubmitted(false);

    if (!navigator.geolocation) {
      setLocationStatus("GPS lookup is not available in this browser.");
      return;
    }

    setIsLocatingWard(true);
    setLocationStatus("Requesting permission to detect the complaint location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setCapturedCoordinates(nextCoordinates);
        setLocationStatus(
          `Location captured at ${nextCoordinates.latitude.toFixed(5)}, ${nextCoordinates.longitude.toFixed(5)}. The ward can now be resolved from GPS data.`,
        );
        setIsLocatingWard(false);
      },
      () => {
        setLocationStatus("Location permission was denied or the lookup failed.");
        setIsLocatingWard(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
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
                  {/* Backend integration: values now match the Prisma enum exactly. */}
                  {CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category ? (
                  <p className="text-sm text-destructive">
                    {errors.category.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ward">Ward number / zone</Label>
                <div className="field-with-action">
                  <Input
                    id="ward"
                    placeholder="Example: Ward 84 or Zone 3"
                    aria-invalid={errors.ward ? "true" : "false"
                    }
                    className="field-with-action__input"
                    onInput={() => setHasSubmitted(false)}
                    {...register("ward", {
                      required: "Enter the ward or zone.",
                      minLength: {
                        value: 2,
                        message: "Please add a ward or zone reference.",
                      },
                    })}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="field-with-action__button"
                    onClick={handleWardLocationLookup}
                    aria-label="Detect location using GPS"
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
                {errors.ward ? (
                  <p className="text-sm text-destructive">
                    {errors.ward.message}
                  </p>
                ) : (
                  <p className="field-hint">
                    Tap the GPS icon if you do not know the ward or zone.
                  </p>
                )}
                {locationStatus ? (
                  <p className="field-hint field-hint--location">
                    {isLocatingWard ? "Detecting location... " : null}
                    {locationStatus}
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
              {/* Backend integration: the complaint is now persisted by the API. */}
              <span>Submission is securely stored for municipal review.</span>
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
                {/* Backend integration: display the real report ID returned by the API. */}
                Reference number: <span>{createdReport?.id}</span>
              </p>
              <p>
                Your complaint has been recorded and is ready for municipal
                review.
              </p>
            </div>
          ) : null}

          {/* Backend integration: show request failures without clearing the form. */}
          {submissionError ? (
            <p className="text-sm text-destructive" role="alert">
              {submissionError}
            </p>
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
