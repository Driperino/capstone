"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import axios from "axios";
import MotionGrowAndFloat from "../animation/MotionGrowAndFloat";

interface Plant {
  _id: string;
  common_name: string;
  scientific_name: string;
  family: string;
  origin?: string;
  description?: string;
  care_instructions?: {
    water_frequency?: string;
    light_requirements?: string;
    humidity?: string;
    temperature?: string;
    soil?: string;
  };
  propagation_methods?: string[];
  toxicity?: string;
  common_issues?: string[];
  ideal_container?: string;
  growth_rate?: string;
  fertilizer?: string;
}

interface PlantCardProps {
  plantId: string;
}

export default function PlantCard({ plantId }: PlantCardProps) {
  const [plant, setPlant] = useState<Plant | null>(null);

  useEffect(() => {
    async function fetchPlant() {
      try {
        const response = await axios.get(
          `${window.location.origin}/api/houseplants/${plantId}`
        );
        if (response.data) {
          setPlant(response.data);
          console.log("Plant data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    }

    if (plantId) {
      fetchPlant();
    }
  }, [plantId]);

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    <MotionGrowAndFloat>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{plant.common_name}</CardTitle>
        </CardHeader>
        <CardContent>
          {plant.description && <p>{plant.description}</p>}
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="basic-info">
              <AccordionTrigger>Scientific Information</AccordionTrigger>
              <AccordionContent>
                <p>
                  <strong>Scientific Name:</strong> {plant.scientific_name}
                </p>
                <p>
                  <strong>Family:</strong> {plant.family}
                </p>
                {plant.origin && (
                  <p>
                    <strong>Origin:</strong> {plant.origin}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care-instructions">
              <AccordionTrigger>Care Instructions</AccordionTrigger>
              <AccordionContent>
                {plant.care_instructions && (
                  <div>
                    <p>
                      <strong>Water Frequency:</strong>{" "}
                      {plant.care_instructions.water_frequency}
                    </p>
                    <p>
                      <strong>Light Requirements:</strong>{" "}
                      {plant.care_instructions.light_requirements}
                    </p>
                    <p>
                      <strong>Humidity:</strong>{" "}
                      {plant.care_instructions.humidity}
                    </p>
                    <p>
                      <strong>Temperature:</strong>{" "}
                      {plant.care_instructions.temperature}
                    </p>
                    <p>
                      <strong>Soil:</strong> {plant.care_instructions.soil}
                    </p>
                  </div>
                )}
                {plant.propagation_methods && (
                  <p>
                    <strong>Propagation Methods:</strong>{" "}
                    {plant.propagation_methods.join(", ")}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="more-info">
              <AccordionTrigger>More Information</AccordionTrigger>
              <AccordionContent>
                {plant.toxicity && (
                  <p>
                    <strong>Toxicity:</strong> {plant.toxicity}
                  </p>
                )}
                {plant.common_issues && (
                  <p>
                    <strong>Common Issues:</strong>{" "}
                    {plant.common_issues.join(", ")}
                  </p>
                )}
                {plant.ideal_container && (
                  <p>
                    <strong>Ideal Container:</strong> {plant.ideal_container}
                  </p>
                )}
                {plant.growth_rate && (
                  <p>
                    <strong>Growth Rate:</strong> {plant.growth_rate}
                  </p>
                )}
                {plant.fertilizer && (
                  <p>
                    <strong>Fertilizer:</strong> {plant.fertilizer}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </MotionGrowAndFloat>
  );
}
