import React from "react";
import styles from "./LeftSidebar.module.css";
import { CheckboxGroup, Flex, Slider } from "@radix-ui/themes";

const LeftSidebar = ({
  workType,
  duration,
  jobType,
  handleDurationValue,
  handleJobTypeValue,
  rate,
  experienceLevel,
  handleWorkTypeValue,
  handleRateValue,
  handleExperienceLevelValue,
}) => {
  return (
    <aside className={styles.sidebar}>
      <p>Work Type</p>
      <CheckboxGroup.Root
        defaultValue={[workType]}
        name="worktype"
        onValueChange={(v) => {
          handleWorkTypeValue(v);
        }}
      >
        <CheckboxGroup.Item value="full-time">Full time</CheckboxGroup.Item>
        <CheckboxGroup.Item value="part-time">Part time</CheckboxGroup.Item>
        <CheckboxGroup.Item value="internship">Internship</CheckboxGroup.Item>
        <CheckboxGroup.Item value="project-work">
          Project work
        </CheckboxGroup.Item>
      </CheckboxGroup.Root>

      <p>Experience Level</p>
      <CheckboxGroup.Root
        defaultValue={[experienceLevel]}
        name="experience"
        onValueChange={(v) => {
          handleExperienceLevelValue(v);
         
        }}
      >
        <CheckboxGroup.Item value="entry level">Entry Level</CheckboxGroup.Item>
        <CheckboxGroup.Item value="mid level">Mid Level</CheckboxGroup.Item>
        <CheckboxGroup.Item value="senior level">
          Senior Level
        </CheckboxGroup.Item>
      </CheckboxGroup.Root>

      <p>Duration</p>
      <CheckboxGroup.Root
        defaultValue={[duration]}
        name="duration"
        onValueChange={(v) => {
          handleDurationValue(v);
       
        }}
      >
        <CheckboxGroup.Item value="permanent">Permanent</CheckboxGroup.Item>
        <CheckboxGroup.Item value="temporarily">Temporary</CheckboxGroup.Item>
      </CheckboxGroup.Root>

      <p>Job Type</p>
      <CheckboxGroup.Root
        defaultValue={[jobType]}
        name="jobtype"
        onValueChange={(v) => {
          handleJobTypeValue(v);
     
        }}
      >
        <CheckboxGroup.Item value="on-site">On-Site</CheckboxGroup.Item>
        <CheckboxGroup.Item value="remote">Remote</CheckboxGroup.Item>
      </CheckboxGroup.Root>

      <p style={{ marginBottom: 0 }}>Hourly Rate</p>
      <Flex gap={"1"} maxWidth="200px" justify={"center"} align={"center"}>
        <p
          style={{
            fontSize: "14px",
            margin: 0,
          }}
        >
          ${rate}/hr
        </p>
        <Slider
          style={{ width: "120px" }}
          defaultValue={[rate]}
          size="2"
          onValueChange={(v) => {
            handleRateValue(v);
            
          }}
        />
        <p></p>
      </Flex>

      {/* <CheckboxGroup.Root
        defaultValue={[rate.toString()]}
        name="example"
        onValueChange={(v) => {onChangeRate(parseInt(v)); console.log(v)}}
      >
        <CheckboxGroup.Item value="10">$10+/h</CheckboxGroup.Item>
        <CheckboxGroup.Item value="20">$20+/h</CheckboxGroup.Item>
        <CheckboxGroup.Item value="40">$40+/h</CheckboxGroup.Item>
        <CheckboxGroup.Item value="80">$80+/h</CheckboxGroup.Item>
      </CheckboxGroup.Root> */}
    </aside>
  );
};

export default LeftSidebar;
