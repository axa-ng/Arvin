def create_study_plan(assignments):
    plan = []

    for a in assignments:
        plan.append({
            "task": f"Work on {a.get('name', 'assignment')}",
            "day": "today"
        })

    return plan